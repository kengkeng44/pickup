"""V2 sanity sweep: also surface near-misses (jaccard 0.3-0.5, single content-word leak, option-word-in-sentence)
to verify no P1 escapes."""
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
    return re.findall(r"[a-zA-Z']+", s.lower())

def content_words(toks):
    return [t for t in toks if t not in STOPWORDS and len(t) > 1]

near_misses = []
for lesson in data:
    lid = lesson['id']
    m = re.match(r'kt-ch1-l(\d+)', lid)
    short_lid = f"L{m.group(1)}" if m else lid
    for q in lesson.get('questions', []):
        t = q.get('type')
        if t not in ('listen-mc', 'listen-comprehension'):
            continue
        sub_skill = q.get('subSkill', '')
        if sub_skill == 'vocab':
            continue
        sentence = q.get('sentence', '') or ''
        question = q.get('question', '') or ''
        options = q.get('options', [])
        ci = q.get('correctIndex', -1)
        if ci < 0 or ci >= len(options):
            continue
        correct = options[ci]
        s_toks = tokenize(sentence)
        o_toks = tokenize(correct)
        q_toks = tokenize(question)
        s_cw = set(content_words(s_toks))
        o_cw = set(content_words(o_toks))
        q_cw = set(content_words(q_toks))
        shared_sent = s_cw & o_cw
        shared_q = q_cw & o_cw
        # Single content-word leak
        single_leak = (len(shared_sent) == 1 and len(o_cw) >= 1)
        # Option content word in question
        q_leak = (len(shared_q) >= 1)
        # Jaccard borderline
        jac = (len(shared_sent) / len(s_cw | o_cw)) if (s_cw | o_cw) else 0
        flags = []
        if single_leak and jac > 0.2:
            flags.append(f'1cw-leak(jac={jac:.2f}:{shared_sent})')
        if q_leak:
            flags.append(f'opt-cw-in-q({shared_q})')
        if flags:
            near_misses.append({
                'lesson': short_lid, 'qid': q.get('id'), 'type': t,
                'S': sentence, 'Q': question, 'correct': correct,
                'flags': flags,
                'sub_skill': sub_skill,
            })

print(f"=== NEAR-MISSES ({len(near_misses)}) ===")
for r in near_misses:
    print(f"{r['lesson']} | {r['qid']} | {r['type']} | sub={r['sub_skill']} | {' ; '.join(r['flags'])}")
    print(f"   S: {r['S']}")
    print(f"   Q: {r['Q']}")
    print(f"   correct: {r['correct']}")
    print()
