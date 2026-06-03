"use client";

import { useState } from "react";

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string;
  domains: { name: string };
}

interface Props {
  questions: Question[];
  userId: string;
}

export default function ExamEngine({ questions, userId }: Props) {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <div style={{ maxWidth: "700px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#F0F4FF", margin: "0 0 12px" }}>MCQ Practice Exam</h1>
        <div style={{ backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
          <p style={{ color: "#8A9BBF", fontSize: "15px" }}>Questions are being added. Check back soon!</p>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div style={{ maxWidth: "700px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#F0F4FF", margin: "0 0 4px" }}>MCQ Practice Exam</h1>
        <p style={{ color: "#8A9BBF", marginBottom: "32px", fontSize: "14px" }}>CompTIA Security+ SY0-701 (Security+)</p>
        <div style={{ backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "14px", padding: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>
            {[["Questions", `${questions.length}`], ["Time Suggested", "90 min"], ["Passing Score", "750/900"], ["Domains", "5"]].map(([label, value]) => (
              <div key={label} style={{ textAlign: "center", backgroundColor: "#0D1B3E", borderRadius: "10px", padding: "16px" }}>
                <div style={{ fontSize: "24px", fontWeight: 900, color: "#C9A44A" }}>{value}</div>
                <div style={{ fontSize: "12px", color: "#8A9BBF", marginTop: "4px" }}>{label}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setStarted(true)} style={{ width: "100%", backgroundColor: "#C9A44A", color: "#0D1B3E", border: "none", borderRadius: "9px", padding: "14px", fontSize: "15px", fontWeight: 800, cursor: "pointer" }}>
            Start Practice Exam →
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const correct = Object.entries(answers).filter(([i, ans]) => questions[parseInt(i)].correct_answer === ans).length;
    const total = Object.keys(answers).length;
    const pct = Math.round((correct / total) * 100);

    const domainScores: Record<string, { correct: number; total: number }> = {};
    Object.entries(answers).forEach(([i, ans]) => {
      const q = questions[parseInt(i)];
      const domain = q.domains?.name || "Unknown";
      if (!domainScores[domain]) domainScores[domain] = { correct: 0, total: 0 };
      domainScores[domain].total++;
      if (q.correct_answer === ans) domainScores[domain].correct++;
    });

    return (
      <div style={{ maxWidth: "700px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#F0F4FF", margin: "0 0 24px" }}>Exam Results</h1>
        <div style={{ backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "14px", padding: "32px", marginBottom: "24px", textAlign: "center" }}>
          <div style={{ fontSize: "64px", fontWeight: 900, color: pct >= 75 ? "#10B981" : "#EF4444", lineHeight: 1 }}>{pct}%</div>
          <div style={{ fontSize: "16px", color: "#8A9BBF", marginTop: "8px" }}>{correct} of {total} correct</div>
          <div style={{ marginTop: "12px", fontSize: "14px", color: pct >= 75 ? "#10B981" : "#EF4444", fontWeight: 700 }}>
            {pct >= 75 ? "✓ Passing score!" : "✗ Keep practicing — aim for 75%+"}
          </div>
        </div>
        <div style={{ backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "14px", padding: "28px", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#C9A44A", margin: "0 0 16px", letterSpacing: "0.04em" }}>DOMAIN BREAKDOWN</h3>
          {Object.entries(domainScores).map(([domain, score]) => {
            const pct = Math.round((score.correct / score.total) * 100);
            return (
              <div key={domain} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "13px", color: "#F0F4FF" }}>{domain}</span>
                  <span style={{ fontSize: "13px", color: pct >= 75 ? "#10B981" : "#EF4444", fontWeight: 700 }}>{pct}%</span>
                </div>
                <div style={{ backgroundColor: "#1E3265", borderRadius: "4px", height: "6px" }}>
                  <div style={{ width: `${pct}%`, backgroundColor: pct >= 75 ? "#10B981" : "#EF4444", height: "6px", borderRadius: "4px", transition: "width 0.5s" }} />
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={() => { setStarted(false); setCurrent(0); setAnswers({}); setSelected(null); setFinished(false); }} style={{ width: "100%", backgroundColor: "#C9A44A", color: "#0D1B3E", border: "none", borderRadius: "9px", padding: "14px", fontSize: "15px", fontWeight: 800, cursor: "pointer" }}>
          Retake Exam
        </button>
      </div>
    );
  }

  const q = questions[current];
  const OPTIONS = [
    { key: "A", value: q.option_a },
    { key: "B", value: q.option_b },
    { key: "C", value: q.option_c },
    { key: "D", value: q.option_d },
  ];
  const answered = selected !== null;
  const isCorrect = selected === q.correct_answer;

  const next = () => {
    if (selected) setAnswers((prev) => ({ ...prev, [current]: selected }));
    setSelected(null);
    setShowExplanation(false);
    if (current + 1 >= questions.length) setFinished(true);
    else setCurrent((c) => c + 1);
  };

  return (
    <div style={{ maxWidth: "780px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <span style={{ fontSize: "13px", color: "#8A9BBF" }}>Question {current + 1} of {questions.length}</span>
          {q.domains && <span style={{ marginLeft: "12px", fontSize: "11px", backgroundColor: "rgba(201,164,74,0.1)", color: "#C9A44A", border: "1px solid rgba(201,164,74,0.3)", borderRadius: "20px", padding: "2px 10px" }}>{q.domains.name}</span>}
        </div>
        <div style={{ backgroundColor: "#1E3265", borderRadius: "8px", height: "6px", width: "200px" }}>
          <div style={{ width: `${((current + 1) / questions.length) * 100}%`, backgroundColor: "#C9A44A", height: "6px", borderRadius: "8px", transition: "width 0.3s" }} />
        </div>
      </div>

      <div style={{ backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "14px", padding: "32px", marginBottom: "16px" }}>
        <p style={{ fontSize: "16px", color: "#F0F4FF", lineHeight: 1.7, margin: "0 0 28px", fontWeight: 500 }}>{q.question}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {OPTIONS.map(({ key, value }) => {
            if (!value) return null;
            let bg = "#0D1B3E";
            let border = "#1E3265";
            let color = "#F0F4FF";
            if (answered) {
              if (key === q.correct_answer) { bg = "rgba(16,185,129,0.1)"; border = "#10B981"; color = "#10B981"; }
              else if (key === selected) { bg = "rgba(239,68,68,0.1)"; border = "#EF4444"; color = "#EF4444"; }
            } else if (key === selected) { bg = "rgba(201,164,74,0.1)"; border = "#C9A44A"; }
            return (
              <button key={key} onClick={() => !answered && setSelected(key)} disabled={answered} style={{ display: "flex", alignItems: "center", gap: "14px", backgroundColor: bg, border: `1.5px solid ${border}`, borderRadius: "10px", padding: "14px 18px", cursor: answered ? "default" : "pointer", textAlign: "left", transition: "all 0.15s" }}>
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", border: `2px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color, flexShrink: 0 }}>{key}</span>
                <span style={{ fontSize: "14px", color, lineHeight: 1.5 }}>{value}</span>
              </button>
            );
          })}
        </div>
      </div>

      {answered && q.explanation && (
        <div style={{ backgroundColor: isCorrect ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${isCorrect ? "#10B981" : "#EF4444"}`, borderRadius: "10px", padding: "16px 20px", marginBottom: "16px" }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#8A9BBF", lineHeight: 1.6 }}>
            <span style={{ fontWeight: 700, color: isCorrect ? "#10B981" : "#EF4444" }}>{isCorrect ? "Correct! " : "Incorrect. "}</span>
            {q.explanation}
          </p>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => { setAnswers((prev) => ({ ...prev, [current]: "skipped" })); setSelected(null); setShowExplanation(false); if (current + 1 >= questions.length) setFinished(true); else setCurrent((c) => c + 1); }} style={{ background: "none", border: "none", color: "#4A5C80", cursor: "pointer", fontSize: "14px" }}>
          Skip →
        </button>
        {answered && (
          <button onClick={next} style={{ backgroundColor: "#C9A44A", color: "#0D1B3E", border: "none", borderRadius: "9px", padding: "12px 28px", fontSize: "14px", fontWeight: 800, cursor: "pointer" }}>
            {current + 1 >= questions.length ? "See Results →" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}
