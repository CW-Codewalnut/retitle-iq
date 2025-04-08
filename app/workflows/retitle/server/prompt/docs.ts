export const RETITLE_IQ_RESEARCH_DOC = `
<TitleGenerationGuidelines>
  <CoreObjective>Generate blog titles that are simultaneously SEO-optimized for ranking *and* creatively compelling to maximize human engagement, curiosity, and click-through rates (CTR). The goal is not just functional accuracy, but insightful, attention-grabbing headlines.</CoreObjective>
  <CreativeGoal>Strive for titles with **creative flair, originality, and strong resonance** with the target audience's psychology and needs. Avoid predictability and generic phrasing. Aim for titles that feel **human-crafted, insightful, and uniquely valuable.**</CreativeGoal>
  <KeyPrinciples>
    <KeywordIntegration>
      <Constraint>Include the primary target keyword naturally within the title.</Constraint>
      <BestPractice>Place the keyword strategically (often near the beginning) where it flows best and maximizes relevance without feeling forced.</BestPractice>
      <Rule>Use the primary keyword only ONCE. Avoid keyword stuffing or awkward phrasing solely for keyword placement.</Rule>
    </KeywordIntegration>
    <LengthAndClarity>
      <Constraint>Keep titles concise: aim for approximately 50-60 characters (typically 6-10 words).</Constraint>
      <Reason>Ensures full visibility in SERPs and improves scannability.</Reason>
      <Rule>The title MUST clearly and accurately communicate the core topic and promise of the blog post.</Rule>
    </LengthAndClarity>
    <CompellingHooks>
      <Instruction>Strategically incorporate at least one hook element to **create genuine intrigue, highlight unique value, or evoke emotion**, ensuring it aligns perfectly with the content. Use hooks creatively, not just formulaically.</Instruction>
      <Types>
        <Hook name="Numbers">Use numerals (e.g., "7 Ways") for clear structure and expectation setting. Odd numbers often work well; consider if the number itself adds value (e.g., "The 3 Pillars of...").</Hook>
        <Hook name="PowerWords">Use persuasive/emotive words (e.g., "Proven," "Essential," "Surprising," "Effortless," "Secret") judiciously to add impact. Avoid overused clichés ("Ultimate," "Best," "Hack") unless used in a truly fresh or specific context.</Hook>
        <Hook name="EmotionalTriggers">Tap into curiosity, aspiration, urgency, FOMO, or address specific pain points/fears. Negative framing ("Mistakes," "Avoid," "Stop") can be powerful if the content provides clear solutions/value and the tone is appropriate.</Hook>
        <Hook name="Questions">Phrase titles as engaging questions that reflect user search intent, challenge assumptions, or pique deep curiosity (e.g., "Is X Silently Sabotaging Y?", "What If You Could...?"). Ensure the article thoroughly answers the question.</Hook>
        <Hook name="Formatting">Use brackets "[]"" for tangible value clarification (e.g., "[Checklist]", "[Case Study]", "[Expert Interview]", "(Updated 2025)") or colons ":" / dashes "-" for compelling subtitles that add specific benefit or contrast.</Hook>
      </Types>
      <Caution>Avoid forced or generic application of hooks. A simple, clear title is better than one with an awkward or irrelevant hook.</Caution>
    </CompellingHooks>
    <ContentAlignmentAndAccuracy>
      <CriticalRule>The title MUST be an **honest and accurate reflection** of the blog post's core message, scope, depth, promise, and overall tone. List numbers, specific claims, and promised outcomes in the title MUST precisely match the content.</CriticalRule>
      <Constraint>Absolutely AVOID clickbait, misleading claims, or hyperbole that the content cannot substantiate.</Constraint>
      <Reason>Builds reader trust, ensures low bounce rates, and maintains brand credibility. The title sets the expectation; the content must deliver.</Reason>
    </ContentAlignmentAndAccuracy>
    <UniquenessAndDifferentiation>
      <Instruction>Analyze competitor titles in the SERP results not just for keywords, but for **common angles, tones, formats, and potential gaps.**</Instruction>
      <Rule>Craft a title that **stands out memorably**. Aim for a distinct angle, a fresher perspective, a more specific promise, a stronger emotional connection, or a unique format that differentiates it from the competition.</Rule>
      <Goal>Give searchers a compelling reason to choose *this* article over others.</Goal>
    </UniquenessAndDifferentiation>
    <SearchIntentAlignment>
      <Instruction>Deeply understand the *underlying need* or question behind the primary keyword. Ensure the title's format, language, and promise directly address that intent.</Instruction>
      <Examples>Informational intent might need a "What is/Why is" or comprehensive guide format. Transactional might need benefit-driven language. Navigational needs clarity. Consider the user's stage in their journey.</Examples>
    </SearchIntentAlignment>
    <HumanFocusAndVoice>
      <Rule>Write for humans first. The title must read naturally, be engaging, and ideally reflect the brand's voice (e.g., authoritative, helpful, witty).</Rule>
      <Constraint>Avoid robotic, awkward, or overly formulaic phrasing. Prioritize clarity and connection over mechanical optimization.</Constraint>
    </HumanFocusAndVoice>
  </KeyPrinciples>
  <ProvenTitleTemplates>
    <Description>Use these proven structures as **inspiration or starting points** during brainstorming. **Adapt, combine, or creatively subvert** these structures; do not just fill in the blanks rigidly. The goal is to leverage their proven appeal while adding originality.</Description>
    <Template structure="[Number] Ways to [Achieve Desired Outcome] Without [Undesired Factor]">
      <Example>7 Ways to Generate Leads Without Burning Your Budget</Example>
    </Template>
    <Template structure="X [Intriguing Adjective] Things You Didn't Know About [Topic]">
      <Example>7 Surprising Things You Didn't Know About Dopamine Fasting</Example>
    </Template>
    <Template structure="Why [Common Belief/Practice] Is [Negative Consequence] (And What Actually Works)">
      <Example>Why 'Just Ship It' Kills Product Quality (And a Better Launch Framework)</Example>
    </Template>
    <Template structure="How We [Achieved Specific, Impressive Result] in [Timeframe] ([Key Method/Insight])">
      <Example>How We Cut Churn by 50% in 3 Months (Using Predictive Analytics)</Example>
    </Template>
    <Template structure="[Number] [Specific Type] Mistakes Costing You [Negative Outcome] When [Doing Something]">
      <Example>5 Subtle Copywriting Mistakes Costing You Sales on Your Landing Page</Example>
    </Template>
    <Template structure="The Truth About [Misunderstood Topic/Myth]">
      <Example>The Uncomfortable Truth About Networking for Introverts</Example>
    </Template>
    <Template structure="The [Number]-Step Blueprint/Formula for [Achieving Complex Goal]">
      <Example>The 5-Step Blueprint for Launching a Scalable Online Course</Example>
    </Template>
    <Template structure="[Topic]: Is It [Provocative Question]?">
      <Example>Remote Work: Revolution or Just a Passing Trend?</Example>
    </Template>
    <Template structure="Unlock [Desired Benefit] with This [Specific Technique/Resource] for [Audience/Context]">
      <Example>Unlock Deeper Sleep with This Simple Breathing Technique (for Busy Professionals)</Example>
    </Template>
  </ProvenTitleTemplates>
  <GenerationProcessGuidance>
    <Step id="1" action="Analyze">Deeply analyze the provided Content (understanding core message, key takeaways, tone, depth) and the Top SERP Results (identifying competitor strategies, keyword usage, angles, tones, formats, and **content/angle gaps**).</Step>
    <Step id="2" action="ScoreCompetitors">Briefly score existing relevant competitor blog titles (out of 10) based on the checklist and creative guidelines, noting strengths and weaknesses (especially genericness).</Step>
    <Step id="3" action="BrainstormCreatively">Generate a diverse list of **at least 25-30** draft titles. Push beyond obvious formulas. Experiment with novel phrasing, unexpected angles, strong emotional connections, and adaptations of \`ProvenTitleTemplates\`.</Step>
    <Step id="4" action="ApplyHooksStrategically">Enhance promising drafts with appropriate hooks, ensuring they add genuine value/intrigue and align perfectly with content.</Step>
    <Step id="5" action="RefineForSEOAndClarity">Edit drafts for conciseness (~60 chars), natural keyword placement, and absolute clarity.</Step>
    <Step id="6" action="SelfCritiqueAndIterate">
      <Instruction>Engage in a rigorous iterative self-review loop (minimum 3 cycles) for the top contenders (~10-15 titles). Be an impartial, strict judge.</Instruction>
      <QuestionsToAsk>
        <Question>Does this title *strictly* meet all checklist criteria (Keyword, Length, Clarity, Accuracy)?</Question>
        <Question>How unique and differentiated is this from competitors? (Score 1-10)</Question>
        <Question>Does it spark genuine curiosity or offer compelling value?</Question>
        <Question>Does it accurately reflect the *entire* scope and promise of the content?</Question>
        <Question>Is it specific enough, or too vague?</Question>
        <Question>Does it sound like a generic AI title, or does it have personality/flair?</Question>
        <Question>Could the hook be stronger, clearer, or more relevant?</Question>
        <Question>Would *I* click on this in a crowded SERP?</Question>
        <Question>How could this be more insightful, bold, or intriguing?</Question>
      </QuestionsToAsk>
      <Goal>Refine titles based on this critique, pushing for greater creativity, impact, and alignment with each iteration.</Goal>
    </Step>
    <Step id="7" action="SelectFinal">Choose the **final 6 titles** that represent the absolute best synthesis of SEO best practices, deep content understanding, competitor differentiation, and creative copywriting flair, ensuring they are polished and error-free.</Step>
  </GenerationProcessGuidance>
  <FinalChecklistItems>
    <Item check="Keyword">Contains primary keyword naturally (once)?</Item>
    <Item check="Length">Is it ~50-60 characters?</Item>
    <Item check="Clarity">Does it clearly state the topic and promise?</Item>
    <Item check="Hook">Does it have a compelling, **content-aligned**, and **non-generic** hook?</Item>
    <Item check="Uniqueness">Is it **distinct and memorable** vs. competitor titles?</Item>
    <Item check="Accuracy">Is it **100% accurate** to the content (scope, details, list count, tone) and NOT clickbait?</Item>
    <Item check="Formatting">Is it grammatically perfect and properly formatted?</Item>
    <Item check="ReadabilityAndVoice">Does it read naturally and engagingly for a human? Does it hint at a unique voice?</Item>
    <Item check="CreativityScore">(Self-assessed) Does this feel genuinely creative and insightful (e.g., 7+/10)?</Item>
  </FinalChecklistItems>
</TitleGenerationGuidelines>
`;
