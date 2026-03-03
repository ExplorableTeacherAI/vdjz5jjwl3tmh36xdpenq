import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH1, EditableParagraph, NumberLine, ColorCodedNumberLine } from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Interactive NumberLine wrapper that syncs with the global variable store
const InteractiveNumberLine = () => {
    const value = useVar('numberLineValue', 3);
    const setVar = useSetVar();

    return (
        <NumberLine
            min={-10}
            max={10}
            step={1}
            value={value as number}
            onValueChange={(newValue) => setVar('numberLineValue', newValue)}
        />
    );
};

/**
 * ------------------------------------------------------------------
 * BLOCK CONFIGURATION
 * ------------------------------------------------------------------
 * This file is the entry point for your lesson content.
 * 
 * INSTRUCTIONS:
 * 1. Create your content using <Block> components.
 * 2. Use Layout components to organize your blocks.
 * 3. Add your blocks to the `blocks` array below.
 * 
 * ------------------------------------------------------------------
 * CROSS-BLOCK VARIABLES
 * ------------------------------------------------------------------
 * Variables can be shared across blocks using the global store.
 * 
 * DEFINE VARIABLES: src/data/variables.ts (use only variables.ts in this file; same structure as exampleBlocks + exampleVariables)
 * 
 * USAGE IN BLOCKS:
 * 
 * // Reading a value (auto-updates when changed):
 * import { useVar } from '@/stores';
 * const amplitude = useVar('amplitude', 1);
 * 
 * // Setting a value:
 * import { useSetVar } from '@/stores';
 * const setVar = useSetVar();
 * setVar('amplitude', 2.5);
 * 
 * // InlineScrubbleNumber (from variables.ts): getVariableInfo(name) + numberPropsFromDefinition(...)
 * <InlineScrubbleNumber varName="amplitude" {...numberPropsFromDefinition(getVariableInfo('amplitude'))} />
 * 
 * ------------------------------------------------------------------
 * AVAILABLE LAYOUTS
 * ------------------------------------------------------------------
 * 
 * 1. StackLayout
 *    - Best for: Title headers, introductory text, broad visualizations.
 *    - Usage:
 *      <StackLayout maxWidth="xl">
 *          <Block id="intro">...</Block>
 *      </StackLayout>
 * 
 * 2. SplitLayout
 *    - Best for: Side-by-side content (e.g., Text + Visualization).
 *    - Usage:
 *      <SplitLayout ratio="1:1" gap="lg">
 *          <Block id="left">...</Block>
 *          <Block id="right">...</Block>
 *      </SplitLayout>
 * 
 * 3. GridLayout
 *    - Best for: Multiple equal-sized items (cards, galleries).
 *    - Usage:
 *      <GridLayout columns={3} gap="md">
 *          <Block id="item-1">...</Block>
 *          <Block id="item-2">...</Block>
 *          <Block id="item-3">...</Block>
 *      </GridLayout>
 * 
 * 4. ScrollytellingLayout
 *    - Best for: Narrative steps with a reactive sticky visualization.
 *    - Usage:
 *      <ScrollytellingLayout varName="scrollStep" visualPosition="right">
 *          <ScrollStep><Block id="step-0">...</Block></ScrollStep>
 *          <ScrollStep><Block id="step-1">...</Block></ScrollStep>
 *          <ScrollVisual><Block id="viz">...</Block></ScrollVisual>
 *      </ScrollytellingLayout>
 * 
 * EXAMPLES:
 * See `src/data/exampleBlocks.tsx` for comprehensive examples.
 * 
 * NOTE: If you are seeing examples in the browser instead of this content,
 * check your .env file and set VITE_SHOW_EXAMPLES=false.
 */

export const blocks: ReactElement[] = [
    <StackLayout key="layout-title" maxWidth="xl">
        <Block id="block-title" padding="md">
            <EditableH1 id="h1-title" blockId="block-title">
                Mathematics Education
            </EditableH1>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-history" maxWidth="xl">
        <Block id="block-1772517540916" padding="sm">
            <EditableParagraph id="para-history" blockId="block-1772517540916">
                The history of mathematics stretches back thousands of years. Ancient civilisations like the Babylonians, Egyptians, and Greeks made remarkable discoveries — from basic arithmetic and geometry to the foundations of algebra and calculus. Each generation built upon the work of those before, creating the rich tapestry of mathematical knowledge we have today.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-block-1772517675421" maxWidth="xl">
        <Block id="block-1772517675421" padding="sm">
            <EditableParagraph id="para-interactive-math" blockId="block-1772517675421">
                Interactive mathematics transforms passive learning into active exploration. Rather than simply reading about concepts, students can manipulate numbers, drag points on graphs, and watch equations come alive. This hands-on approach helps learners build intuition — when you can change a value and instantly see how it affects the outcome, abstract ideas suddenly become concrete and memorable.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-block-1772518087391" maxWidth="xl">
        <Block id="block-1772518087391" padding="sm">
            <InteractiveNumberLine />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-block-1772519201702" maxWidth="xl">
        <Block id="block-1772519201702" padding="sm">
            <EditableParagraph id="para-1772519201702" blockId="block-1772519201702">
                The number line is divided into two distinct regions by zero. To the right of zero lie the positive numbers — these represent quantities, gains, or values above a baseline. To the left of zero lie the negative numbers — representing debts, losses, or values below a reference point. Zero itself is neither positive nor negative; it marks the boundary between these two worlds. Understanding this division helps us make sense of concepts like temperature below freezing, elevations below sea level, and bank account overdrafts.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-block-1772519402569" maxWidth="xl">
        <Block id="block-1772519402569" padding="sm">
            <ColorCodedNumberLine
                min={-10}
                max={10}
                step={1}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-para-1" maxWidth="xl">
        <Block id="block-para-1" padding="sm">
            <EditableParagraph id="para-1" blockId="block-para-1">
                Mathematics is more than just numbers and equations — it is a way of thinking. When students learn maths, they develop problem-solving skills, logical reasoning, and the ability to see patterns in the world around them. Good maths education does not just teach formulas to memorise; it helps students understand why those formulas work and how to apply them in new situations.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
