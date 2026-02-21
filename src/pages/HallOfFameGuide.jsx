import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './HallOfFameGuide.css'

const plans = {
  slow: `<strong>יום 1-2:</strong> רק הפזמון — תקשיבו לשיר ותעקבו אחרי ההגייה<br/>
<strong>יום 3-4:</strong> הוסיפו את הבית הראשון — תתרגלו לאט עם ההגייה<br/>
<strong>יום 5:</strong> הבית השני + הגשר (be students, be teachers...)<br/>
<strong>יום 6:</strong> הכל ביחד! תשירו עם השיר<br/>
<strong>יום 7:</strong> תרגול כללי + ביצוע מושלם!`,
  medium: `<strong>יום 1:</strong> פזמון + בית ראשון — תקשיבו 5 פעמים ותשירו עם ההגייה<br/>
<strong>יום 2:</strong> בית שני + גשר — תרגלו כל חלק 3 פעמים<br/>
<strong>יום 3:</strong> הכל ביחד — תשירו עם השיר מההתחלה עד הסוף!`,
  fast: `<strong>בוקר:</strong> תקשיבו לשיר 3 פעמים תוך מעקב אחרי ההגייה<br/>
<strong>צהריים:</strong> תתרגלו כל חלק בנפרד — פזמון, בתים, גשר<br/>
<strong>ערב:</strong> תשירו את כל השיר 5 פעמים ברצף!<br/>
<span style="color:#f06292;">אפשרי אבל דורש ריכוז!</span>`
}

function HallOfFameGuide() {
  const [displayMode, setDisplayMode] = useState('both')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const revealRef = useRef([])

  const addToRevealRefs = useCallback((el) => {
    if (el && !revealRef.current.includes(el)) {
      revealRef.current.push(el)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1 }
    )

    revealRef.current.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'all 0.6s ease'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const bodyClass = displayMode === 'english' ? 'hof-hide-hebrew' : displayMode === 'hebrew' ? 'hof-hide-english' : ''

  return (
    <div className={`hof-page ${bodyClass}`} dir="rtl">
      <div className="hof-toggle-bar">
        <button
          className={`hof-toggle-btn ${displayMode === 'both' ? 'active' : ''}`}
          onClick={() => setDisplayMode('both')}
        >
          שניהם
        </button>
        <button
          className={`hof-toggle-btn ${displayMode === 'english' ? 'active' : ''}`}
          onClick={() => setDisplayMode('english')}
        >
          רק אנגלית
        </button>
        <button
          className={`hof-toggle-btn ${displayMode === 'hebrew' ? 'active' : ''}`}
          onClick={() => setDisplayMode('hebrew')}
        >
          רק הגייה
        </button>
      </div>

      <div className="hof-container">
        <Link to="/" className="hof-back-link">חזרה לדף הראשי</Link>

        {/* Header */}
        <div className="hof-header">
          <span className="hof-header-emoji">🎤</span>
          <h1>Hall of Fame</h1>
          <div className="hof-subtitle">מדריך הגייה מלא לשיר</div>
          <div className="hof-artist">The Script ft. will.i.am</div>
        </div>

        {/* Tips */}
        <div className="hof-tips-box" ref={addToRevealRefs}>
          <h3>טיפים לפני שמתחילים</h3>
          <div className="hof-tip-item">
            <span className="hof-tip-icon">🔶</span>
            <span>מילים <span style={{ background: 'rgba(255,109,0,0.15)', padding: '1px 5px', borderRadius: '4px' }}>מודגשות בכתום</span> = מילים שדורשות תשומת לב מיוחדת בהגייה</span>
          </div>
          <div className="hof-tip-item">
            <span className="hof-tip-icon">🎵</span>
            <span>ה-TH באנגלית = שימו את קצה הלשון בין השיניים ונשפו. סימנתי את זה כ&quot;דּ&quot; (עם דגש)</span>
          </div>
          <div className="hof-tip-item">
            <span className="hof-tip-icon">🔤</span>
            <span>הצליל W = כמו &quot;וו&quot; קצר עם שפתיים עגולות (לא כמו ו׳ רגיל)</span>
          </div>
          <div className="hof-tip-item">
            <span className="hof-tip-icon">⚡</span>
            <span>gonna = גוֹנָה (קיצור של going to), wanna = ווֹנָה (קיצור של want to)</span>
          </div>
          <div className="hof-tip-item">
            <span className="hof-tip-icon">🔁</span>
            <span>הפזמון חוזר כמה פעמים — ברגע שלומדים אותו, חצי מהשיר מוכן!</span>
          </div>
        </div>

        {/* Key Sounds */}
        <div className="hof-key-sounds" ref={addToRevealRefs}>
          <h3>צלילים חשובים בשיר הזה</h3>
          <div className="hof-sound-grid">
            <div className="hof-sound-item">
              <div className="hof-sound-letter">TH</div>
              <div className="hof-sound-info">כמו <strong>דּ</strong> רכה עם לשון בין שיניים<br/>the, that, through</div>
            </div>
            <div className="hof-sound-item">
              <div className="hof-sound-letter">W</div>
              <div className="hof-sound-info">שפתיים עגולות = <strong>וּוּ</strong> קצר<br/>world, war, walls, walk</div>
            </div>
            <div className="hof-sound-item">
              <div className="hof-sound-letter">R</div>
              <div className="hof-sound-info">לא גורנית! הלשון <strong>לא נוגעת</strong> בתקרה<br/>records, break, rocks</div>
            </div>
            <div className="hof-sound-item">
              <div className="hof-sound-letter">NG</div>
              <div className="hof-sound-info">צליל אפי כמו <strong>נְג</strong> בסוף מילה<br/>standing, banging, breaking</div>
            </div>
            <div className="hof-sound-item">
              <div className="hof-sound-letter">FL</div>
              <div className="hof-sound-info"><strong>פלֵ</strong>ים = flame<br/>הF רכה, לא כמו פ׳ עברית</div>
            </div>
            <div className="hof-sound-item">
              <div className="hof-sound-letter">CH</div>
              <div className="hof-sound-info"><strong>צ׳</strong> = champion, chest, church<br/>כמו צ׳ בעברית!</div>
            </div>
          </div>
        </div>

        {/* Verse 1 */}
        <div className="hof-section">
          <div className="hof-section-label verse">🎸 בית ראשון — Verse 1</div>
          <div className="hof-lyrics-card" ref={addToRevealRefs}>
            <LinePair en={<>Yeah, you can be the <Tricky>greatest</Tricky>, you can be the best</>} he={<>יֶיָה, יוּ קֶן בִּי דְּה <TrickyHe>גְרֵיטֶסט</TrickyHe>, יוּ קֶן בִּי דְּה בֶּסט</>} />
            <LinePair en={<>You can be the King Kong <Tricky>bangin&apos;</Tricky> on your <Tricky>chest</Tricky></>} he={<>יוּ קֶן בִּי דְּה קִינְג קוֹנְג <TrickyHe>בֶּנְגִין</TrickyHe> אוֹן יוֹר <TrickyHe>צ׳ֶסט</TrickyHe></>} />
            <LinePair en={<>You can beat the <Tricky>world</Tricky>, you can win the <Tricky>war</Tricky></>} he={<>יוּ קֶן בִּיט דְּה <TrickyHe>וּוֶרלְד</TrickyHe>, יוּ קֶן ווִין דְּה <TrickyHe>ווֹר</TrickyHe></>} />
            <LinePair en={<>You can talk to God, go <Tricky>bangin&apos;</Tricky> on his door</>} he={<>יוּ קֶן טוֹק טוּ גוֹד, גוֹ <TrickyHe>בֶּנְגִין</TrickyHe> אוֹן הִיז דוֹר</>} />
            <LinePair en={<>You can <Tricky>throw</Tricky> your hands up, you can beat the clock</>} he={<>יוּ קֶן <TrickyHe>דְּרוֹ</TrickyHe> יוֹר הֶנְדְז אַפּ, יוּ קֶן בִּיט דְּה קְלוֹק</>} />
            <LinePair en={<>You can move a <Tricky>mountain</Tricky>, you can break rocks</>} he={<>יוּ קֶן מוּב אַה <TrickyHe>מַאוּנְטֶן</TrickyHe>, יוּ קֶן בְּרֵיק רוֹקְס</>} />
            <LinePair en={<>Some will call that <Tricky>practice</Tricky>, some will call that luck</>} he={<>סַאם ווִיל קוֹל דֶּט <TrickyHe>פְּרֶקְטִיס</TrickyHe>, סַאם ווִיל קוֹל דֶּט לַאק</>} />
            <LinePair en={<>But <Tricky>either way</Tricky> you&apos;re going to the <Tricky>history</Tricky> books</>} he={<>בַּאט <TrickyHe>אִידְּר ווֵיי</TrickyHe> יוֹר גוֹאִינְג טוּ דְּה <TrickyHe>הִיסְטְרִי</TrickyHe> בּוּקְס</>} />
          </div>
        </div>

        {/* Chorus 1 */}
        <div className="hof-section">
          <div className="hof-section-label chorus">🔥 פזמון — Chorus</div>
          <div className="hof-lyrics-card chorus-card" ref={addToRevealRefs}>
            <LinePair en={<><Tricky>Standing</Tricky> in the Hall of Fame</>} he={<><TrickyHe>סְטֶנְדִינְג</TrickyHe> אִין דְּה הוֹל אוֹב פֵיים</>} />
            <LinePair en={<>And the <Tricky>world&apos;s gonna</Tricky> know your name</>} he={<>אֶנְד דְּה <TrickyHe>ווֶרלְדְז גוֹנָה</TrickyHe> נוֹ יוֹר נֵיים</>} />
            <LinePair en={<>&apos;Cause you burn with the <Tricky>brightest</Tricky> flame</>} he={<>קוֹז יוּ בֶּרן ווִידְּ דְּה <TrickyHe>בְּרַייטֶסט</TrickyHe> פְלֵיים</>} />
            <LinePair en="And the world's gonna know your name" he="אֶנְד דְּה ווֶרלְדְז גוֹנָה נוֹ יוֹר נֵיים" />
            <LinePair en={<>And you&apos;ll be on the <Tricky>walls</Tricky> of the Hall of Fame</>} he={<>אֶנְד יוּל בִּי אוֹן דְּה <TrickyHe>ווֹלְז</TrickyHe> אוֹב דְּה הוֹל אוֹב פֵיים</>} />
            <div className="hof-repeat-note">🔁 הפזמון הזה חוזר עוד 3 פעמים בשיר — שווה לתרגל אותו היטב!</div>
          </div>
        </div>

        {/* Verse 2 */}
        <div className="hof-section">
          <div className="hof-section-label verse">🎸 בית שני — Verse 2</div>
          <div className="hof-lyrics-card" ref={addToRevealRefs}>
            <LinePair en={<>You can go the <Tricky>distance</Tricky>, you can run a mile</>} he={<>יוּ קֶן גוֹ דְּה <TrickyHe>דִּיסְטֶנְס</TrickyHe>, יוּ קֶן רַאן אַה מַייל</>} />
            <LinePair en={<>You can walk <Tricky>straight through</Tricky> hell with a smile</>} he={<>יוּ קֶן ווֹק <TrickyHe>סְטְרֵייט דְּרוּ</TrickyHe> הֶל ווִידְּ אַה סְמַייל</>} />
            <LinePair en="You can be a hero, you can get the gold" he="יוּ קֶן בִּי אַה הִירוֹ, יוּ קֶן גֶט דְּה גוֹלְד" />
            <LinePair en={<><Tricky>Breaking</Tricky> all the records they <Tricky>thought</Tricky> would never be broke</>} he={<><TrickyHe>בְּרֵיקִינְג</TrickyHe> אוֹל דְּה רֶקוֹרְדְז דֵּיי <TrickyHe>דּוֹט</TrickyHe> ווּד נֶבֶר בִּי בְּרוֹק</>} />
            <LinePair en="Yeah, do it for your people, do it for your pride" he="יֶיָה, דוּ אִיט פוֹר יוֹר פִּיפּוֹל, דוּ אִיט פוֹר יוֹר פְּרַייד" />
            <LinePair en="Are you ever gonna know if you never even try?" he="?אָר יוּ אֶבֶר גוֹנָה נוֹ אִיף יוּ נֶבֶר אִיבֶן טְרַיי" />
            <LinePair en={<>Do it for your <Tricky>country</Tricky>, do it for your name</>} he={<>דוּ אִיט פוֹר יוֹר <TrickyHe>קַאנְטְרִי</TrickyHe>, דוּ אִיט פוֹר יוֹר נֵיים</>} />
            <LinePair en={<>&apos;Cause <Tricky>there&apos;s</Tricky> gonna be a day when you&apos;re</>} he={<>קוֹז <TrickyHe>דֶּרְז</TrickyHe> גוֹנָה בִּי אַה דֵיי ווֶן יוֹר</>} />
          </div>
        </div>

        {/* Chorus 2 */}
        <div className="hof-section">
          <div className="hof-section-label chorus">🔥 פזמון (חוזר) — Chorus</div>
          <div className="hof-lyrics-card chorus-card" ref={addToRevealRefs}>
            <LinePair en="Standing in the Hall of Fame..." he="...סְטֶנְדִינְג אִין דְּה הוֹל אוֹב פֵיים" />
            <div className="hof-repeat-note">🔁 אותו פזמון כמו למעלה! + בסוף:</div>
            <LinePair en="You'll be on the walls of the Hall of Fame" he="יוּל בִּי אוֹן דְּה ווֹלְז אוֹב דְּה הוֹל אוֹב פֵיים" />
          </div>
        </div>

        {/* Bridge */}
        <div className="hof-section">
          <div className="hof-section-label bridge">🌟 גשר — Bridge</div>
          <div className="hof-lyrics-card bridge-card" ref={addToRevealRefs}>
            <LinePair en={<>Be <Tricky>students</Tricky>, be <Tricky>teachers</Tricky></>} he={<>בִּי <TrickyHe>סְטוּדֶנְטְס</TrickyHe>, בִּי <TrickyHe>טִיצ׳ֶרְז</TrickyHe></>} />
            <LinePair en={<>Be <Tricky>politicians</Tricky>, be <Tricky>preachers</Tricky>, yeah</>} he={<>בִּי <TrickyHe>פּוֹלִיטִישֶׁנְז</TrickyHe>, בִּי <TrickyHe>פְּרִיצ׳ֶרְז</TrickyHe>, יֶיָה</>} />
            <LinePair en={<>Be <Tricky>believers</Tricky>, be leaders</>} he={<>בִּי <TrickyHe>בִּילִיבֶרְז</TrickyHe>, בִּי לִידֶרְז</>} />
            <LinePair en={<>Be <Tricky>astronauts</Tricky>, be <Tricky>champions</Tricky></>} he={<>בִּי <TrickyHe>אֶסְטְרוֹנוֹטְס</TrickyHe>, בִּי <TrickyHe>צ׳ֶמְפִּיוֹנְז</TrickyHe></>} />
            <LinePair en={<>Be <Tricky>truth</Tricky> seekers</>} he={<>בִּי <TrickyHe>טְרוּדּ</TrickyHe> סִיקֶרְז</>} />
            <div className="hof-repeat-note">🔁 החלק הזה חוזר פעמיים!</div>
          </div>
        </div>

        {/* Final Chorus */}
        <div className="hof-section">
          <div className="hof-section-label chorus">🔥 פזמון אחרון + סיום</div>
          <div className="hof-lyrics-card chorus-card" ref={addToRevealRefs}>
            <LinePair en="Standing in the Hall of Fame" he="סְטֶנְדִינְג אִין דְּה הוֹל אוֹב פֵיים" />
            <LinePair en="And the world's gonna know your name" he="אֶנְד דְּה ווֶרלְדְז גוֹנָה נוֹ יוֹר נֵיים" />
            <LinePair en="'Cause you burn with the brightest flame (oh-oh)" he="(קוֹז יוּ בֶּרן ווִידְּ דְּה בְּרַייטֶסט פְלֵיים (אוֹ-אוֹ" />
            <LinePair en="And the world's gonna know your name" he="אֶנְד דְּה ווֶרלְדְז גוֹנָה נוֹ יוֹר נֵיים" />
            <LinePair en="And you'll be on the walls of the Hall of Fame" he="אֶנְד יוּל בִּי אוֹן דְּה ווֹלְז אוֹב דְּה הוֹל אוֹב פֵיים" />

            <div style={{ height: '16px' }} />
            <div style={{ borderTop: '2px dashed rgba(230,81,0,0.2)', paddingTop: '16px' }}>
              <div style={{ color: '#ff6d00', fontWeight: 600, fontSize: '0.9rem', marginBottom: '10px' }}>🎸 הבית הראשון חוזר + סיום:</div>
            </div>

            <LinePair en="Yeah, you can be the greatest, you can be the best..." he="...יֶיָה, יוּ קֶן בִּי דְּה גְרֵיטֶסט, יוּ קֶן בִּי דְּה בֶּסט" />
            <div className="hof-repeat-note">🔁 חוזר על כל הבית הראשון, ונגמר עם:</div>
            <div className="hof-line-pair" style={{ marginTop: '8px' }}>
              <div className="hof-line-en" style={{ fontWeight: 700 }}>Standing in the Hall of Fame</div>
              <div className="hof-line-he" style={{ fontWeight: 700 }}>🎤 סְטֶנְדִינְג אִין דְּה הוֹל אוֹב פֵיים</div>
            </div>
          </div>
        </div>

        {/* Practice Plan */}
        <div className="hof-speed-section" ref={addToRevealRefs}>
          <h3>תוכנית תרגול מומלצת</h3>
          <p>כמה ימים עד שהשיר יהיה מושלם?</p>
          <div className="hof-speed-btns">
            <button
              className={`hof-speed-btn ${selectedPlan === 'slow' ? 'active' : ''}`}
              onClick={() => setSelectedPlan('slow')}
            >
              🐌 שבוע שלם
            </button>
            <button
              className={`hof-speed-btn ${selectedPlan === 'medium' ? 'active' : ''}`}
              onClick={() => setSelectedPlan('medium')}
            >
              🏃 3 ימים
            </button>
            <button
              className={`hof-speed-btn ${selectedPlan === 'fast' ? 'active' : ''}`}
              onClick={() => setSelectedPlan('fast')}
            >
              ⚡ יום אחד
            </button>
          </div>
          {selectedPlan && (
            <div
              className="hof-plan-output"
              dangerouslySetInnerHTML={{ __html: plans[selectedPlan] }}
            />
          )}
        </div>

        {/* Footer */}
        <div className="hof-footer">
          <p>🎵 Hall of Fame — The Script ft. will.i.am</p>
          <p style={{ marginTop: '6px' }}>מדריך הגייה לדוברי עברית 🇮🇱</p>
        </div>
      </div>
    </div>
  )
}

function LinePair({ en, he }) {
  return (
    <div className="hof-line-pair">
      <div className="hof-line-en">{en}</div>
      <div className="hof-line-he">{he}</div>
    </div>
  )
}

function Tricky({ children }) {
  return <span className="hof-tricky">{children}</span>
}

function TrickyHe({ children }) {
  return <span className="hof-tricky-he">{children}</span>
}

export default HallOfFameGuide
