// https://dev.to/phuocng/display-the-line-numbers-in-a-text-area-46mk
'use client';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Textarea as OriginalTextarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export type TextareaProps = React.ComponentProps<'textarea'> & {
  wrapperClassName?: string;
};

export function Textarea({
  className,
  wrapperClassName,
  children,
  ...props
}: TextareaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const linenumbersRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [textAreaStyles, setTextAreaStyles] = useState<React.CSSProperties>();

  const parseValue = (v: string) =>
    v.endsWith('px') ? parseInt(v.slice(0, -2), 10) : 0;

  const calculateNumLines = (str: string) => {
    if (!textAreaRef.current || !canvasRef.current) return 0;
    const textareaStyles = window.getComputedStyle(textAreaRef.current);
    const paddingLeft = parseValue(textareaStyles.paddingLeft);
    const paddingRight = parseValue(textareaStyles.paddingRight);

    const textareaWidth =
      textAreaRef.current.getBoundingClientRect().width -
      paddingLeft -
      paddingRight;
    const words = str.split(' ');
    let lineCount = 0;
    let currentLine = '';

    const context = canvasRef.current.getContext('2d');
    for (let i = 0; i < words.length; i++) {
      const wordWidth = context?.measureText(`${words[i]} `).width ?? 0;
      const lineWidth = context?.measureText(currentLine).width ?? 0;

      if (lineWidth + wordWidth > textareaWidth) {
        lineCount++;
        currentLine = `${words[i]} `;
      } else {
        currentLine += `${words[i]} `;
      }
    }

    if (currentLine.trim() !== '') {
      lineCount++;
    }

    return lineCount;
  };

  const calculateLineNumbers = () => {
    const lines = textAreaRef.current?.value.split('\n') ?? [];
    const numLines = lines.map((line) => calculateNumLines(line));

    const lineNumbers = [];
    let i = 1;
    while (numLines.length > 0) {
      const numLinesOfSentence = numLines.shift() ?? 0;
      lineNumbers.push(i);
      if (numLinesOfSentence > 1) {
        Array(numLinesOfSentence - 1)
          .fill('')
          .forEach((_) => {
            lineNumbers.push('');
          });
      }
      i++;
    }

    return lineNumbers;
  };

  const displayLineNumbers = () => {
    const lineNumbers = calculateLineNumbers();
    if (linenumbersRef.current) {
      linenumbersRef.current.innerHTML = Array.from(
        {
          length: lineNumbers.length,
        },
        (_, i) => `<div>${lineNumbers[i] || '&nbsp;'}</div>`,
      ).join('');
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: first loading
  useEffect(() => {
    if (textAreaRef.current != null) {
      const textareaStyles = window.getComputedStyle(textAreaRef.current);
      const tempObject: Record<string, string | undefined> = {};
      [
        'fontFamily',
        'fontSize',
        'fontWeight',
        'letterSpacing',
        'lineHeight',
        'padding',
      ].forEach((property) => {
        tempObject[property as string] =
          (textareaStyles[property as keyof typeof textareaStyles] as string) ??
          undefined;
      });
      setTextAreaStyles(tempObject);

      const font = `${textareaStyles.fontSize} ${textareaStyles.fontFamily}`;
      const context = canvasRef.current?.getContext('2d');
      if (context) context.font = font;

      const ro = new ResizeObserver(() => {
        const rect = textAreaRef.current?.getBoundingClientRect();
        if (linenumbersRef.current)
          linenumbersRef.current.style.height = `${rect?.height ?? 0}px`;
        displayLineNumbers();
      });
      ro.observe(textAreaRef.current);
    }
  }, []);

  return (
    <div
      className={cn(
        'flex border border-solid border-gray-900 dark:border-gray-800 rounded-lg box-border text-base',
        wrapperClassName,
      )}
    >
      <div
        ref={linenumbersRef}
        style={textAreaStyles}
        className="border-gray-800 dark:border-gray-200 text-end overflow-hidden"
      />
      <OriginalTextarea
        ref={textAreaRef}
        className={cn('border-none outline-none p-2', className)}
        onInput={() => displayLineNumbers()}
        onScroll={() => {
          if (linenumbersRef.current)
            linenumbersRef.current.scrollTop =
              textAreaRef.current?.scrollTop ?? 0;
        }}
        {...props}
      >
        {children}
      </OriginalTextarea>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
