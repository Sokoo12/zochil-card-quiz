import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "@fontsource-variable/rubik";
import "@fontsource-variable/inter";
import "./admin.css";

const ORIGINAL_QUESTIONS = [
  [1,"Постын эхэнд анхаарал татах хэсгийг юу гэдэг вэ?",["CTA","Hook","Caption","Insight"],1],
  [2,"Брэндийг танихад хамгийн их тусалдаг зүйл аль вэ?",["Нэг хэвийн өнгө, дүр төрх","Постын урт","Follower-ийн тоо","Постын цаг"],0],
  [3,"Instagram Story ихэвчлэн хэдэн цаг харагддаг вэ?",["12 цаг","48 цаг","24 цаг","72 цаг"],2],
  [4,"CTA-ийн гол зорилго юу вэ?",["Постыг чимэглэх","Хэрэглэгчийг үйлдэлд уриалах","Лого харуулах","Reach нэмэх"],1],
  [5,"“Like, comment, share” нь юуг илэрхийлдэг вэ?",["Engagement","Conversion","Branding","Targeting"],0],
  [6,"Контентын гол санаа ойлгомжгүй байвал хамгийн түрүүнд юу засах вэ?",["Font","Message","Background","Hashtag"],1],
  [7,"Reel ямар төрлийн контент вэ?",["Богино видео","Blog нийтлэл","Podcast","Banner"],0],
  [8,"“Buy now” ямар төрлийн текст вэ?",["Headline","Caption","CTA","Tagline"],2],
  [9,"Hashtag ямар тэмдэгтэй эхэлдэг вэ?",["@","#","&","%"],1],
  [10,"Viral контент гэж юуг хэлэх вэ?",["Маш урт контент","Төлбөртэй сурталчилгаа","Богино хугацаанд олон хүнд тархсан контент","Зөвхөн influencer-ийн контент"],2],
  [11,"Контентын thumbnail-ийн гол үүрэг юу вэ?",["Видео хадгалах","Анхаарал татаж, дарахад хүргэх","Caption орлох","Comment нэмэх"],1],
  [12,"Audience гэж юу вэ?",["Брэндийн өнгө","Контент үзэж буй хүмүүс","Зар сурталчилгааны төсөв","Постын загвар"],1],
  [13,"Сайн caption хамгийн түрүүнд ямар байх ёстой вэ?",["Маш урт","Ойлгомжтой","Олон emoji-той","Англи хэлтэй"],1],
  [14,"Post reach гэж юуг хэлэх вэ?",["Пост хэдэн хүнд хүрснийг","Пост хэдэн удаа хадгалагдсаныг","Пост хэдэн comment авсныг","Постын үнийг"],0],
  [15,"Impression гэж юу вэ?",["Пост нийт хэдэн удаа харагдсан","Хэдэн хүн follow хийсэн","Хэдэн хүн худалдан авсан","Хэдэн хүн message бичсэн"],0],
  [16,"Engagement сайтай контентын нэг шинж юу вэ?",["Хүмүүс хариу үйлдэл их хийдэг","Text маш урт байдаг","Logo маш том байдаг","Зураггүй байдаг"],0],
  [17,"Контентын эхний хэдэн секунд хамгийн чухал вэ?",["Эхний 1–3 секунд","Эхний 20 секунд","Сүүлийн 10 секунд","Дундах хэсэг"],0],
  [18,"UGC гэж юу вэ?",["Брэндийн өөрийн сурталчилгаа","Хэрэглэгчийн бүтээсэн контент","Influencer contract","Paid ad"],1],
  [19,"Social proof-ийн жишээ аль вэ?",["Customer review","Brand color","Font style","Logo size"],0],
  [20,"Influencer marketing-ийн гол санаа юу вэ?",["Influencer-ийн аудиторт брэндээ хүргэх","Website дизайн солих","Product price өсгөх","Logo redesign хийх"],0],
  [21,"A/B test хийхдээ юу харьцуулдаг вэ?",["Хоёр өөр хувилбар","Хоёр өөр компани","Хоёр өөр ажилтан","Хоёр өөр төхөөрөмж"],0],
  [22,"Брэндийн tone of voice гэж юу вэ?",["Брэндийн харилцах өнгө аяс","Логоны өнгө","Video resolution","Website speed"],0],
  [23,"Сайн social media post хамгийн түрүүнд юутай байх хэрэгтэй вэ?",["Тодорхой зорилго","20 hashtag","Том logo","Олон font"],0],
  [24,"Conversion гэж юуг хэлэх вэ?",["Хэрэглэгч хүссэн үйлдэл хийх","Пост share хийх","Logo харах","Caption унших"],0],
  [25,"Product post дээр үнэ харуулахын давуу тал юу вэ?",["Хэрэглэгчид мэдээллийг шууд өгнө","Reach автоматаар өснө","Follower нэмнэ","Video урт болно"],0],
  [26,"Контент календарийн гол давуу тал юу вэ?",["Контентоо урьдчилан төлөвлөх","Follower худалдаж авах","Зураг автоматаар үүсгэх","Comment устгах"],0],
  [27,"Repost гэж юу вэ?",["Өмнөх контентыг дахин нийтлэх","Пост устгах","Caption солих","Account солих"],0],
  [28,"Giveaway хийх гол зорилго юу байж болох вэ?",["Оролцоо, хандалтыг нэмэгдүүлэх","Website хаах","Logo солих","Caption багасгах"],0],
  [29,"Target audience гэж юу вэ?",["Брэндийн хүрэхийг хүссэн хүмүүс","Компанийн ажилчид","Бүх интернет хэрэглэгч","Зөвхөн competitor"],0],
  [30,"“Behind the scenes” контентын давуу тал юу вэ?",["Брэндийг илүү бодит, ойр харагдуулдаг","Үнийг өсгөдөг","Logo автоматаар нэмдэг","Ads хэрэггүй болгодог"],0],
  [31,"Carousel post гэж юу вэ?",["Нэг пост дотор олон зураг/slide","Зөвхөн video post","Story highlight","Live stream"],0],
  [32,"Сайн visual hierarchy юу хийдэг вэ?",["Юуг эхэлж харахыг ойлгомжтой болгодог","Постыг урт болгодог","Comment нэмдэг","Price бууруулдаг"],0],
  [33,"Брэндийн өнгийг тогтмол ашиглахын давуу тал юу вэ?",["Танигдах байдлыг нэмэгдүүлнэ","Video хурдан ачаална","Reach автоматаар өснө","Follower шууд нэмнэ"],0],
  [34,"Постын headline ямар байх нь илүү үр дүнтэй вэ?",["Богино, ойлгомжтой","Маш урт","Олон emoji-той","Зөвхөн том үсгээр"],0],
  [35,"Content creator-ийн хамгийн чухал чадваруудын нэг аль вэ?",["Санаагаа ойлгомжтой хүргэх","Бүх platform дээр post хийх","Үргэлж trend дагах","Бүх video-г урт хийх"],0],
  [36,"Trend ашиглахдаа хамгийн түрүүнд юуг бодох вэ?",["Брэндтэй нийцэж байгаа эсэх","Trend хамгийн урт эсэх","Хэн эхэлснийг","Hashtag хэд байгааг"],0],
  [37,"Тухайн пост олон share авбал юу гэж ойлгож болох вэ?",["Хүмүүст түгээх үнэ цэнтэй санагдсан","Пост хэт урт байсан","Logo том байсан","Үнэ бага байсан"],0],
  [38,"Customer review ашиглах нь юунд тусалдаг вэ?",["Итгэл нэмэгдүүлэх","Website хурдлуулах","Product count өсгөх","Caption багасгах"],0],
  [39,"Video subtitle яагаад хэрэгтэй вэ?",["Дуугүй үзэж байгаа хүнд ойлгомжтой болгоно","Video богино болгоно","Logo сольдог","View-г автоматаар өсгөнө"],0],
  [40,"Маркетингийн хамгийн үндсэн зорилгын нэг аль вэ?",["Зөв хэрэглэгчид зөв санал хүргэх","Пост бүрийг viral болгох","Бүх platform дээр байх","Өдөр бүр discount хийх"],0],
].map(([id,question,options,correct])=>({id,question,options,correct,level:"core"}));

const HARD_QUESTIONS = [
  [41,"CTR өссөн ч борлуулалт буурвал юуг түрүүлж шалгах вэ?",["Landing page","Логоны хэмжээ","Follower count","Hashtag"],0],
  [42,"Reach ижил, frequency өссөн бол юу гэсэн үг вэ?",["Нэг хүмүүс дахин харсан","Шинэ хүмүүс нэмэгдсэн","Үнэ буурсан","Сэтгэгдэл өссөн"],0],
  [43,"ROAS өндөр ч ашиг бага байж болох шалтгаан?",["Margin бага","Reach өндөр","CTR өндөр","Share олон"],0],
  [44,"A/B тестэд яагаад нэг зүйл л өөрчилдөг вэ?",["Нөлөөлсөн шалтгааныг мэдэх","Төсөв хэмнэх","Reach өсгөх","Хугацаа сунгах"],0],
  [45,"CAC нь LTV-ээс их бол юу ойлгох вэ?",["Өсөлт ашиггүй байж магадгүй","Контент viral болсон","Retention төгс","Reach хангалттай"],0],
  [46,"Click их, bounce rate өндөр бол гол сэжиг юу вэ?",["Зар ба хуудас зөрсөн","Лого жижиг","Follower цөөн","Hashtag буруу"],0],
  [47,"Retargeting-ээс худалдан авсан хүнийг яагаад хасах вэ?",["Илүү зардал гаргахгүй","CTR бууруулах","Reach нуух","Үнэ нэмэх"],0],
  [48,"Аль нь vanity metric байж болох вэ?",["Зорилгогүй like","Цэвэр ашиг","Conversion","Давтан худалдан авалт"],0],
  [49,"UTM ашиглах хамгийн чухал шалтгаан?",["Traffic-ийн эх үүсвэрийг мэдэх","Зургийг хурдлуулах","Лого солих","Comment нуух"],0],
  [50,"Discount-аар conversion өсвөл дараа нь юуг шалгах вэ?",["Цэвэр ашиг","Follower count","Font size","Post length"],0],
].map(([id,question,options,correct])=>({id,question,options,correct,level:"hard"}));

const STORAGE_KEY = "zochil-marketing-quiz-results-v6";
const HISTORY_KEY = "zochil-marketing-quiz-round-history-v6";
const INACTIVITY_MS = 120_000;
const RESULT_MS = 20_000;
const ADMIN_PIN = "1208";
const COLORS = ["yellow","cream","pink","cyan"];

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function readRoundHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
  catch { return []; }
}

function mixQuestionOptions(question, correctPosition) {
  const correctText = question.options[question.correct];
  const wrongOptions = shuffle(question.options.filter((_, optionIndex) => optionIndex !== question.correct));
  const options = [...wrongOptions];
  options.splice(correctPosition, 0, correctText);
  return { ...question, options, correct: correctPosition };
}

function buildRound() {
  const history = readRoundHistory().slice(0, 5);
  const recentlyUsed = new Set(history.flat());
  const availableCore = ORIGINAL_QUESTIONS.filter((question) => !recentlyUsed.has(question.id));
  const availableHard = HARD_QUESTIONS.filter((question) => !recentlyUsed.has(question.id));
  const selected = shuffle([
    ...shuffle(availableCore.length >= 4 ? availableCore : ORIGINAL_QUESTIONS).slice(0, 4),
    ...shuffle(availableHard.length ? availableHard : HARD_QUESTIONS).slice(0, 1),
  ]);
  const correctPositions = shuffle([0, 1, 2, 3, Math.floor(Math.random() * 4)]);
  localStorage.setItem(HISTORY_KEY, JSON.stringify([selected.map((question) => question.id), ...history].slice(0, 5)));
  return selected.map((question, questionIndex) => mixQuestionOptions(question, correctPositions[questionIndex]));
}

function readResults() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}

function saveResults(results) { localStorage.setItem(STORAGE_KEY, JSON.stringify(results)); }

export function App() {
  const [screen, setScreen] = useState("home");
  const [round, setRound] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState(readResults);
  const [resetWarning, setResetWarning] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [resetError, setResetError] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);
  const inactivityRef = useRef(null);
  const warningRef = useRef(null);
  const logoPressRef = useRef(null);

  const goHome = useCallback(() => {
    setScreen("home"); setRound([]); setIndex(0); setAnswers([]); setSelected(null); setResetWarning(false); setResetModal(false); setResetCode(""); setResetError(false); setResetNotice(false);
  }, []);

  const armInactivity = useCallback(() => {
    clearTimeout(inactivityRef.current); clearTimeout(warningRef.current); setResetWarning(false);
    if (screen !== "quiz") return;
    warningRef.current = setTimeout(() => setResetWarning(true), INACTIVITY_MS - 10_000);
    inactivityRef.current = setTimeout(goHome, INACTIVITY_MS);
  }, [screen, goHome]);

  useEffect(() => {
    const stopKioskShortcuts = (event) => {
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && ["l","t","n","w","r"].includes(key)) event.preventDefault();
      if (event.key === "F5") event.preventDefault();
    };
    const stopContext = (event) => event.preventDefault();
    window.addEventListener("keydown", stopKioskShortcuts); window.addEventListener("contextmenu", stopContext);
    return () => { window.removeEventListener("keydown", stopKioskShortcuts); window.removeEventListener("contextmenu", stopContext); };
  }, []);

  useEffect(() => {
    const activity = () => armInactivity();
    ["pointerdown","keydown","touchstart"].forEach((name) => window.addEventListener(name, activity));
    armInactivity();
    return () => { ["pointerdown","keydown","touchstart"].forEach((name) => window.removeEventListener(name, activity)); clearTimeout(inactivityRef.current); clearTimeout(warningRef.current); };
  }, [armInactivity]);

  useEffect(() => {
    if (screen !== "result") return undefined;
    const timer = setTimeout(goHome, RESULT_MS);
    return () => clearTimeout(timer);
  }, [screen, goHome]);

  const startQuiz = () => { setRound(buildRound()); setIndex(0); setAnswers([]); setSelected(null); setScreen("quiz"); };

  const finishRound = (finalAnswers) => {
    const finalScore = finalAnswers.filter((answer) => answer.isCorrect).length;
    const attempt = { id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`, finishedAt: new Date().toISOString(), score: finalScore, total: 5, perfect: finalScore === 5, answers: finalAnswers };
    const nextResults = [attempt, ...results];
    saveResults(nextResults); setResults(nextResults); setScreen("result");
  };

  const chooseAnswer = (choice) => {
    if (selected !== null) return;
    setSelected(choice);
    const question = round[index];
    const nextAnswers = [...answers, { questionId: question.id, question: question.question, selected: choice, selectedText: question.options[choice], correct: question.correct, correctText: question.options[question.correct], isCorrect: choice === question.correct, level: question.level }];
    setAnswers(nextAnswers);
    setTimeout(() => {
      if (index === round.length - 1) finishRound(nextAnswers);
      else { setIndex((value) => value + 1); setSelected(null); }
    }, 720);
  };

  const current = round[index];
  const score = answers.filter((answer) => answer.isCorrect).length;
  const stats = useMemo(() => {
    const total = results.length;
    return { total, perfect: results.filter((result) => result.perfect).length, average: total ? results.reduce((sum, result) => sum + result.score, 0) / total : 0 };
  }, [results]);

  const exportCsv = () => {
    const rows = [["Огноо","Оноо","Төгс хариулт","Асуулт","Сонгосон","Зөв хариулт","Зөв эсэх"]];
    results.forEach((result) => result.answers.forEach((answer) => rows.push([new Date(result.finishedAt).toLocaleString("mn-MN"), `${result.score}/5`, result.perfect ? "Тийм" : "Үгүй", answer.question, answer.selectedText, answer.correctText, answer.isCorrect ? "Тийм" : "Үгүй"])));
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"','""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `zochil-quiz-${new Date().toISOString().slice(0,10)}.csv`; anchor.click(); URL.revokeObjectURL(url);
  };

  const startLogoHold = () => { logoPressRef.current = setTimeout(() => setScreen("report"), 1800); };
  const endLogoHold = () => clearTimeout(logoPressRef.current);
  const openResetModal = () => { setResetCode(""); setResetError(false); setResetNotice(false); setResetModal(true); };
  const closeResetModal = () => { setResetModal(false); setResetCode(""); setResetError(false); };
  const enterResetDigit = (digit) => { setResetError(false); setResetCode((value) => value.length < 4 ? `${value}${digit}` : value); };
  const confirmReset = () => {
    if (resetCode !== ADMIN_PIN) { setResetError(true); setResetCode(""); return; }
    saveResults([]); setResults([]); closeResetModal(); setResetNotice(true);
  };

  return <main className={`app screen-${screen}`}>
    <header className="topbar">
      <button className="logo-button" aria-label="Тайлан нээхийн тулд удаан дарна уу" onPointerDown={startLogoHold} onPointerUp={endLogoHold} onPointerLeave={endLogoHold}><img src="/assets/zochil-logo.png" alt="Zochil — Ecommerce for everyone" /></button>
      {screen === "quiz" && <div className="progress" aria-label={`Асуулт ${index + 1} / 5`}><span className="progress-number">{index + 1}<b>/5</b></span><div className="progress-dots">{[0,1,2,3,4].map((step) => <i key={step} className={step <= index ? "active" : ""} />)}</div></div>}
      {screen === "report" && <button className="small-button" onClick={goHome}>Нүүр</button>}
    </header>

    {screen === "home" && <section className="home content"><p className="eyebrow">ZOCHIL CONTENT QUIZ</p><h1>Маркетингийн<br/><span>мэдлэгээ</span> сориорой!</h1><p className="home-copy">50 асуултаас санамсаргүй 5 асуулт. Бүгдийг зөв хариулаад шагналаа аваарай.</p><button className="start-button" onClick={startQuiz}><span>Эхлэх</span><b>→</b></button><p className="home-note">5 асуулт · Ойролцоогоор 2 минут</p></section>}

    {screen === "quiz" && current && <section className="quiz content"><div className="question-meta"><span>{current.level === "hard" ? "ZOCHIL HARD" : "ZOCHIL QUIZ"}</span></div><h2>{current.question}</h2><div className="answers">{current.options.map((option, choice) => { const state = selected === null ? "" : choice === current.correct ? "correct" : choice === selected ? "wrong" : "muted"; return <button key={option} className={`answer ${COLORS[choice]} ${state}`} onClick={() => chooseAnswer(choice)} disabled={selected !== null}><span className="answer-letter">{String.fromCharCode(65 + choice)}</span><span>{option}</span></button>; })}</div></section>}

    {screen === "result" && <section className="result content">{score === 5 ? <><p className="eyebrow">ZOCHIL QUIZ · 5 / 5</p><h2>Ялагч<br/><span>боллоо!</span></h2><p>Баяр хүргэе! Энэ дэлгэцийг ажилтанд үзүүлээд шагналаа аваарай.</p><div className="prize-stamp">Шагналын эзэн</div></> : <><p className="eyebrow">ZOCHIL QUIZ</p><h2>Мундаг<br/><span>байлаа!</span></h2><div className="result-score">{score} / 5</div><p>Дараагийн удаа тавуулаа зөв хариулаарай.</p><button className="start-button compact" onClick={startQuiz}><span>Дахин тоглох</span><b>↻</b></button></>}<button className="text-button" onClick={goHome}>Нүүр рүү буцах</button></section>}

    {screen === "report" && <section className="report content"><div className="report-heading"><div><p className="eyebrow">LOCAL EVENT REPORT</p><h2>Quiz тайлан</h2></div><button className="export-button" onClick={exportCsv} disabled={!results.length}>CSV татах</button></div><div className="metrics"><article><strong>{stats.total}</strong><span>Нийт оролдлого</span></article><article><strong>{stats.perfect}</strong><span>Шагналын эзэн</span></article><article><strong>{stats.average.toFixed(1)}</strong><span>Дундаж оноо</span></article></div><div className="report-table"><table><thead><tr><th>Огноо</th><th>Оноо</th><th>Үр дүн</th></tr></thead><tbody>{results.slice(0,20).map((result) => <tr key={result.id}><td>{new Date(result.finishedAt).toLocaleString("mn-MN")}</td><td>{result.score}/5</td><td>{result.perfect ? "Ялагч" : "Оролцсон"}</td></tr>)}</tbody></table>{!results.length && <p className="empty">Одоогоор хадгалсан үр дүн алга.</p>}</div><div className="report-footer"><p className="report-hint">Нүүр дэлгэц дээр логог удаан дарж тайланг нээнэ.</p>{resetNotice && <span className="reset-notice" role="status">Бүх оноог тэглэлээ.</span>}<button className="reset-scores-button" onClick={openResetModal} disabled={!results.length}>Бүх оноог тэглэх</button></div></section>}
    {resetModal && <div className="pin-overlay" role="dialog" aria-modal="true" aria-labelledby="pin-title"><div className="pin-dialog"><p className="eyebrow">ADMIN ACCESS</p><h3 id="pin-title">4 оронтой код оруулна уу</h3><div className="pin-dots" aria-label={`${resetCode.length} орон оруулсан`}>{[0,1,2,3].map((dot) => <i key={dot} className={dot < resetCode.length ? "filled" : ""} />)}</div>{resetError && <p className="pin-error">Код буруу байна. Дахин оролдоно уу.</p>}<div className="pin-pad">{[1,2,3,4,5,6,7,8,9].map((digit) => <button key={digit} onClick={() => enterResetDigit(digit)}>{digit}</button>)}<button className="pin-action" onClick={() => setResetCode((value) => value.slice(0,-1))}>⌫</button><button onClick={() => enterResetDigit(0)}>0</button><button className="pin-action" onClick={() => setResetCode("")}>C</button></div><div className="pin-footer"><button className="pin-cancel" onClick={closeResetModal}>Болих</button><button className="pin-confirm" onClick={confirmReset} disabled={resetCode.length !== 4}>Оноо тэглэх</button></div></div></div>}
    {resetWarning && <div className="idle-warning" role="alert"><strong>Та тоглож байна уу?</strong><span>10 секундийн дараа нүүр хуудас руу буцна.</span></div>}
  </main>;
}
