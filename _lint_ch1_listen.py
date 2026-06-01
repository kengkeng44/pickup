import json
import re

with open(r'C:\Users\acer\Desktop\wordwar\public\lessons-ch1.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

STOPWORDS = set("""the a an is are was were be been being am
of in on at to for from with by about as into onto over under
and or but if so then than that this these those there here
i you he she it we they me him her us them my your his its our their
do does did doing done have has had having will would shall should can could may might must
not no yes also too very just only really quite still even
what who whom whose which when where why how
out up down off back away again very some any all every each many much few""".split())
STOPWORDS.update(["'s", "'re", "'ve", "'d", "'ll", "'t"])

def tokenize(s):
    s = s.lower()
    toks = re.findall(r"[a-zA-Z']+", s)
    return toks

def substring_token_match(sentence, option, n=3):
    s_toks = tokenize(sentence)
    o_toks = tokenize(option)
    if not o_toks or len(o_toks) < n:
        return False
    for i in range(len(s_toks) - len(o_toks) + 1):
        if s_toks[i:i+len(o_toks)] == o_toks:
            return True
    return False

def substring_token_match_any(sentence, option):
    s_toks = tokenize(sentence)
    o_toks = tokenize(option)
    if not o_toks:
        return False
    for i in range(len(s_toks) - len(o_toks) + 1):
        if s_toks[i:i+len(o_toks)] == o_toks:
            return True
    return False

def jaccard(a, b):
    sa, sb = set(a), set(b)
    if not sa or not sb:
        return 0
    return len(sa & sb) / len(sa | sb)

def content_words(toks):
    return [t for t in toks if t not in STOPWORDS and len(t) > 1]

results = []
stats = {
    'listen-mc': {'total': 0, 'violations': 0, 'vocab_exempt': 0},
    'listen-comprehension': {'total': 0, 'violations': 0, 'vocab_exempt': 0},
}

for lesson in data:
    lid = lesson['id']
    m = re.match(r'kt-ch1-l(\d+)', lid)
    short_lid = f"L{m.group(1)}" if m else lid
    for q in lesson.get('questions', []):
        t = q.get('type')
        if t not in ('listen-mc', 'listen-comprehension'):
            continue
        stats[t]['total'] += 1
        sentence = q.get('sentence', '') or ''
        question = q.get('question', '') or ''
        options = q.get('options', [])
        ci = q.get('correctIndex', -1)
        if ci < 0 or ci >= len(options):
            continue
        correct = options[ci]
        sub_skill = q.get('subSkill', '')
        violations = []

        s_toks = tokenize(sentence)
        o_toks = tokenize(correct)
        q_toks = tokenize(question)

        r1_exempt = (sub_skill == 'vocab')
        if r1_exempt:
            stats[t]['vocab_exempt'] += 1

        r1_hit = False
        if not r1_exempt:
            if substring_token_match(sentence, correct, n=3):
                r1_hit = True
                violations.append('R1')

        a4_substring = substring_token_match_any(sentence, correct)
        a4_echo = False
        if t == 'listen-comprehension':
            if tokenize(sentence) == tokenize(question) and sentence.strip():
                a4_echo = True
        s_cw = content_words(s_toks)
        o_cw = content_words(o_toks)
        jac = jaccard(s_cw, o_cw) if s_cw and o_cw else 0
        a4_jaccard = jac > 0.5

        a4_flags = []
        if a4_substring and not r1_exempt and not r1_hit:
            a4_flags.append('A4-substr')
        if a4_echo:
            a4_flags.append('A4-echo')
        if a4_jaccard and not r1_exempt:
            a4_flags.append('A4-jac')

        a6_hit = False
        if not r1_exempt and o_toks:
            for i in range(len(q_toks) - len(o_toks) + 1):
                if q_toks[i:i+len(o_toks)] == o_toks:
                    a6_hit = True
                    break
        if a6_hit:
            violations.append('A6')

        a7_hit = False
        if not r1_exempt:
            shared = set(o_cw) & set(s_cw)
            if len(shared) >= 2:
                a7_hit = True
                violations.append('A7')

        violations.extend(a4_flags)

        if violations:
            stats[t]['violations'] += 1
            snippet = sentence[:30] + ('...' if len(sentence) > 30 else '')
            results.append({
                'lesson': short_lid,
                'qid': q.get('id', ''),
                'type': t,
                'snippet': snippet,
                'correct': correct,
                'violations': violations,
                'sentence': sentence,
                'question': question,
                'sub_skill': sub_skill,
                'jaccard': round(jac, 2),
                'shared_cw': sorted(list(set(o_cw) & set(s_cw))),
            })

print("=== STATS ===")
for t, s in stats.items():
    rate = (s['violations'] / s['total'] * 100) if s['total'] else 0
    print(f"{t}: total={s['total']}, violations={s['violations']} ({rate:.1f}%), vocab_exempt={s['vocab_exempt']}")
total_q = sum(s['total'] for s in stats.values())
total_v = sum(s['violations'] for s in stats.values())
print(f"OVERALL: {total_q} total, {total_v} violations ({total_v/total_q*100:.1f}%)")

print(f"\n=== VIOLATIONS ({len(results)}) ===")
for r in results:
    print(f"{r['lesson']} | {r['qid']} | {r['type']} | jac={r['jaccard']} | {','.join(r['violations'])} | shared={r['shared_cw']}")
    print(f"   S: {r['sentence']}")
    print(f"   Q: {r['question']}")
    print(f"   correct: {r['correct']}  (subSkill={r['sub_skill']})")
    print()

with open(r'C:\Users\acer\Desktop\wordwar\_lint_results_ch1_listen.json', 'w', encoding='utf-8') as f:
    json.dump({'stats': stats, 'results': results}, f, ensure_ascii=False, indent=2)
