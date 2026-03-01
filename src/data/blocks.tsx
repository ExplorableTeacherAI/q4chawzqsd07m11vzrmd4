import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH1,
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineTooltip,
    InlineLinkedHighlight,
    InlineClozeInput,
    InlineFormula,
    RightTriangleDiagram,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import {
    getDefaultValues,
    variableDefinitions,
    getVariableInfo,
    numberPropsFromDefinition,
    linkedHighlightPropsFromDefinition,
    clozePropsFromDefinition,
} from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

/**
 * ------------------------------------------------------------------
 * PYTHAGOREAN THEOREM LESSON
 * An Interactive Explorable Explanation for Middle School Students
 * ------------------------------------------------------------------
 */

export const blocks: ReactElement[] = [
    // ══════════════════════════════════════════════════════════════
    // SECTION 1: Introduction — A Surprising Discovery
    // ══════════════════════════════════════════════════════════════
    <StackLayout key="layout-title" maxWidth="xl">
        <Block id="block-title" padding="lg">
            <EditableH1 id="h1-title" blockId="block-title">
                The Pythagorean Theorem
            </EditableH1>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-intro-hook" maxWidth="xl">
        <Block id="block-intro-hook" padding="sm">
            <EditableParagraph id="para-intro-hook" blockId="block-intro-hook">
                Imagine you're building a ramp for skateboarding. The ramp rises 3 meters
                high and extends 4 meters along the ground. Without measuring the sloped
                surface directly, can you figure out exactly how long it is? Ancient
                mathematicians discovered a magical relationship that lets you do precisely
                that — and it works for every right triangle in the universe.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-intro-tease" maxWidth="xl">
        <Block id="block-intro-tease" padding="sm">
            <EditableParagraph id="para-intro-tease" blockId="block-intro-tease">
                This relationship is called the{" "}
                <InlineTooltip
                    id="tooltip-pythagoras"
                    tooltip="Named after the Greek mathematician Pythagoras, who lived around 500 BCE, though the relationship was known to Babylonians 1000 years earlier."
                    color="#f97316"
                >
                    Pythagorean theorem
                </InlineTooltip>
                , and once you understand it, you'll see right triangles — and their hidden
                measurements — everywhere.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // ══════════════════════════════════════════════════════════════
    // SECTION 2: What is a Right Triangle?
    // ══════════════════════════════════════════════════════════════
    <StackLayout key="layout-section2-title" maxWidth="xl">
        <Block id="block-section2-title" padding="md">
            <EditableH2 id="h2-right-triangle" blockId="block-section2-title">
                What Makes a Right Triangle Special?
            </EditableH2>
        </Block>
    </StackLayout>,

    <SplitLayout key="layout-right-triangle-explain" ratio="1:1" gap="lg" align="center">
        <Block id="block-right-triangle-text" padding="sm">
            <EditableParagraph id="para-right-triangle-def" blockId="block-right-triangle-text">
                A right triangle has one angle that measures exactly 90 degrees — a
                perfect corner, like the corner of a book or a door frame. The two
                sides that form this right angle are called the{" "}
                <InlineLinkedHighlight
                    varName="trianglePart"
                    highlightId="legA"
                    {...linkedHighlightPropsFromDefinition(getVariableInfo("trianglePart"))}
                >
                    legs
                </InlineLinkedHighlight>
                . The third side — the one opposite the right angle — is always the
                longest side, and it has a special name:{" "}
                <InlineLinkedHighlight
                    varName="trianglePart"
                    highlightId="hypotenuse"
                    {...linkedHighlightPropsFromDefinition(getVariableInfo("trianglePart"))}
                >
                    the hypotenuse
                </InlineLinkedHighlight>
                .
            </EditableParagraph>
        </Block>
        <Block id="block-right-triangle-diagram" padding="sm">
            <RightTriangleDiagram
                legAVarName="legA"
                legBVarName="legB"
                highlightVarName="trianglePart"
                showSquares={false}
                showLabels={true}
                height={300}
            />
        </Block>
    </SplitLayout>,

    <StackLayout key="layout-naming-convention" maxWidth="xl">
        <Block id="block-naming-convention" padding="sm">
            <EditableParagraph id="para-naming" blockId="block-naming-convention">
                We label the legs as{" "}
                <InlineFormula id="formula-a" latex="\textcolor{#3b82f6}{a}" /> and{" "}
                <InlineFormula id="formula-b" latex="\textcolor{#14b8a6}{b}" />, and the
                hypotenuse as{" "}
                <InlineFormula id="formula-c" latex="\textcolor{#f97316}{c}" />. It doesn't
                matter which leg you call "a" or "b" — the theorem works either way.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // ══════════════════════════════════════════════════════════════
    // SECTION 3: The Theorem Revealed
    // ══════════════════════════════════════════════════════════════
    <StackLayout key="layout-section3-title" maxWidth="xl">
        <Block id="block-section3-title" padding="md">
            <EditableH2 id="h2-theorem" blockId="block-section3-title">
                The Theorem: A Perfect Relationship
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-theorem-statement" maxWidth="xl">
        <Block id="block-theorem-statement" padding="sm">
            <EditableParagraph id="para-theorem-intro" blockId="block-theorem-statement">
                Here's the remarkable discovery: in any right triangle, if you square
                the lengths of the two legs and add them together, you always get the
                square of the hypotenuse. Always. No exceptions.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-formula-main" maxWidth="xl">
        <Block id="block-formula-main" padding="lg">
            <FormulaBlock
                latex="\clr{a}{a}^2 + \clr{b}{b}^2 = \clr{c}{c}^2"
                colorMap={{
                    a: "#3b82f6",
                    b: "#14b8a6",
                    c: "#f97316",
                }}
            />
        </Block>
    </StackLayout>,

    <SplitLayout key="layout-interactive-theorem" ratio="1:1" gap="lg" align="center">
        <Block id="block-theorem-interactive-text" padding="sm">
            <EditableParagraph id="para-theorem-interactive" blockId="block-theorem-interactive-text">
                Watch the theorem in action! With leg{" "}
                <InlineFormula id="formula-leg-a-label" latex="\textcolor{#3b82f6}{a}" /> ={" "}
                <InlineScrubbleNumber
                    id="scrubble-leg-a"
                    varName="legA"
                    {...numberPropsFromDefinition(getVariableInfo("legA"))}
                />{" "}
                and leg{" "}
                <InlineFormula id="formula-leg-b-label" latex="\textcolor{#14b8a6}{b}" /> ={" "}
                <InlineScrubbleNumber
                    id="scrubble-leg-b"
                    varName="legB"
                    {...numberPropsFromDefinition(getVariableInfo("legB"))}
                />
                , the hypotenuse{" "}
                <InlineFormula id="formula-hyp-label" latex="\textcolor{#f97316}{c}" />{" "}
                is always <InlineFormula id="formula-sqrt" latex="\sqrt{a^2 + b^2}" />.
            </EditableParagraph>
        </Block>
        <Block id="block-interactive-triangle" padding="sm">
            <RightTriangleDiagram
                legAVarName="legA"
                legBVarName="legB"
                showSquares={false}
                showLabels={true}
                height={320}
            />
        </Block>
    </SplitLayout>,

    // ══════════════════════════════════════════════════════════════
    // SECTION 4: Why Does It Work? (Visual Proof)
    // ══════════════════════════════════════════════════════════════
    <StackLayout key="layout-section4-title" maxWidth="xl">
        <Block id="block-section4-title" padding="md">
            <EditableH2 id="h2-proof" blockId="block-section4-title">
                Why Does This Work? A Visual Proof
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-proof-intro" maxWidth="xl">
        <Block id="block-proof-intro" padding="sm">
            <EditableParagraph id="para-proof-intro" blockId="block-proof-intro">
                The theorem isn't just a rule to memorize — there's a beautiful reason
                why it's true. Imagine building a square on each side of the triangle.
                The area of each square equals that side's length multiplied by itself
                — in other words, the side length squared.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <SplitLayout key="layout-visual-proof" ratio="1:1" gap="lg" align="center">
        <Block id="block-proof-explanation" padding="sm">
            <EditableParagraph id="para-proof-explain" blockId="block-proof-explanation">
                The square on leg{" "}
                <InlineFormula id="formula-proof-a" latex="\textcolor{#3b82f6}{a}" /> has area{" "}
                <InlineFormula id="formula-a-squared" latex="\textcolor{#3b82f6}{a^2}" />.
                The square on leg{" "}
                <InlineFormula id="formula-proof-b" latex="\textcolor{#14b8a6}{b}" /> has area{" "}
                <InlineFormula id="formula-b-squared" latex="\textcolor{#14b8a6}{b^2}" />.
                And remarkably, when you add those two areas together, you get exactly
                the area of the square on the hypotenuse:{" "}
                <InlineFormula id="formula-c-squared" latex="\textcolor{#f97316}{c^2}" />.
            </EditableParagraph>
        </Block>
        <Block id="block-proof-diagram" padding="sm">
            <RightTriangleDiagram
                legAVarName="legA"
                legBVarName="legB"
                showSquares={true}
                showSquareAreas={true}
                showLabels={true}
                height={400}
            />
        </Block>
    </SplitLayout>,

    <StackLayout key="layout-proof-conclusion" maxWidth="xl">
        <Block id="block-proof-conclusion" padding="sm">
            <EditableParagraph id="para-proof-conclusion" blockId="block-proof-conclusion">
                Drag the numbers above to change the triangle's shape — no matter what
                values you choose, the two smaller squares always combine to match
                the large square perfectly. This visual proof shows that{" "}
                <InlineFormula id="formula-final" latex="a^2 + b^2 = c^2" /> isn't
                just a formula — it's a fundamental truth about space itself.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // ══════════════════════════════════════════════════════════════
    // SECTION 5: Finding Missing Sides
    // ══════════════════════════════════════════════════════════════
    <StackLayout key="layout-section5-title" maxWidth="xl">
        <Block id="block-section5-title" padding="md">
            <EditableH2 id="h2-practice" blockId="block-section5-title">
                Using the Theorem: Finding Missing Sides
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-intro" maxWidth="xl">
        <Block id="block-practice-intro" padding="sm">
            <EditableParagraph id="para-practice-intro" blockId="block-practice-intro">
                The real power of the Pythagorean theorem is that if you know any two
                sides of a right triangle, you can always find the third. Let's practice!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-q1" maxWidth="xl">
        <Block id="block-practice-q1" padding="md">
            <EditableParagraph id="para-practice-q1" blockId="block-practice-q1">
                <strong>Question 1:</strong> A right triangle has legs of length 3 and 4.
                Using the formula{" "}
                <InlineFormula id="formula-q1" latex="c = \sqrt{a^2 + b^2} = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25}" />
                , the hypotenuse equals{" "}
                <InlineClozeInput
                    id="cloze-answer1"
                    varName="practiceAnswer1"
                    correctAnswer="5"
                    placeholder="?"
                    {...clozePropsFromDefinition(getVariableInfo("practiceAnswer1"))}
                />
                .
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-q2" maxWidth="xl">
        <Block id="block-practice-q2" padding="md">
            <EditableParagraph id="para-practice-q2" blockId="block-practice-q2">
                <strong>Question 2:</strong> A right triangle has one leg of length 6 and
                a hypotenuse of length 10. To find the missing leg, we rearrange:{" "}
                <InlineFormula id="formula-q2" latex="b = \sqrt{c^2 - a^2} = \sqrt{10^2 - 6^2} = \sqrt{100 - 36} = \sqrt{64}" />
                . The missing leg equals{" "}
                <InlineClozeInput
                    id="cloze-answer2"
                    varName="practiceAnswer2"
                    correctAnswer="8"
                    placeholder="?"
                    {...clozePropsFromDefinition(getVariableInfo("practiceAnswer2"))}
                />
                .
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // ══════════════════════════════════════════════════════════════
    // SECTION 6: Real-World Application
    // ══════════════════════════════════════════════════════════════
    <StackLayout key="layout-section6-title" maxWidth="xl">
        <Block id="block-section6-title" padding="md">
            <EditableH2 id="h2-application" blockId="block-section6-title">
                Real-World Application: The Ladder Problem
            </EditableH2>
        </Block>
    </StackLayout>,

    <SplitLayout key="layout-ladder-problem" ratio="1:1" gap="lg" align="center">
        <Block id="block-ladder-text" padding="sm">
            <EditableParagraph id="para-ladder-problem" blockId="block-ladder-text">
                A painter places a ladder against a wall. The base of the ladder is{" "}
                <InlineScrubbleNumber
                    id="scrubble-ladder-dist"
                    varName="ladderDistance"
                    {...numberPropsFromDefinition(getVariableInfo("ladderDistance"))}
                />{" "}
                meters from the wall, and the ladder reaches{" "}
                <InlineScrubbleNumber
                    id="scrubble-ladder-height"
                    varName="ladderHeight"
                    {...numberPropsFromDefinition(getVariableInfo("ladderHeight"))}
                />{" "}
                meters up the wall. The wall, the ground, and the ladder form a right
                triangle — so we can use the Pythagorean theorem to find the ladder's
                length without measuring it directly!
            </EditableParagraph>
        </Block>
        <Block id="block-ladder-diagram" padding="sm">
            <RightTriangleDiagram
                legAVarName="ladderDistance"
                legBVarName="ladderHeight"
                showSquares={false}
                showLabels={true}
                height={320}
                colorA="#3b82f6"
                colorB="#14b8a6"
                colorC="#f97316"
            />
        </Block>
    </SplitLayout>,

    <StackLayout key="layout-ladder-conclusion" maxWidth="xl">
        <Block id="block-ladder-conclusion" padding="md">
            <EditableParagraph id="para-ladder-conclusion" blockId="block-ladder-conclusion">
                This same principle is used by architects, engineers, navigators, and
                game developers every day. Any time you need to find a distance that
                you can't measure directly — across a river, through a building, or in
                a video game — the Pythagorean theorem is your tool.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-summary" maxWidth="xl">
        <Block id="block-summary" padding="lg">
            <EditableParagraph id="para-summary" blockId="block-summary">
                <strong>Remember:</strong> In every right triangle, the squares of the
                two legs add up to the square of the hypotenuse. This simple relationship,
                discovered thousands of years ago, remains one of the most useful tools
                in all of mathematics:{" "}
                <InlineFormula id="formula-summary" latex="\boxed{a^2 + b^2 = c^2}" />.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
