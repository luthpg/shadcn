'use client';
import hslToHex from 'hsl-to-hex';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export interface AvatarInColorProps {
  text?: string;
  className?: string;
}

/**
 * 文字に基づいて一意の背景色を持つアバターを生成するコンポーネント。
 * クリックするとランダムな色に変わります。
 * @param text - アバターに表示する文字（通常はユーザー名の頭文字）
 * @param className - 追加のCSSクラス
 */
export function AvatarInColor({
  text = '',
  className = '',
}: AvatarInColorProps) {
  const [color, setColor] = useState<string>('#FFFFFF'); // 初期色は白

  const saturationAndLuminosity: [number, number] = [85, 85];

  const defineColorCode = useMemo(
    () => ({
      text: (char: string): number => {
        if (!char) return Math.floor(Math.random() * 21);
        // アルファベットの場合
        if (/^[A-Za-z]/.test(char)) {
          return Math.floor(
            ((char.toUpperCase().charCodeAt(0) - 65) / (90 - 65)) * 20,
          );
        }
        // その他の文字コードの場合
        const baseCode = char.charCodeAt(0).toString();
        const lastTwo = baseCode.slice(-2);
        return Math.floor((Number(lastTwo) / 99) * 20);
      },
      random: (): number => Math.floor(Math.random() * 21),
    }),
    [],
  );

  const calculateAndSetColor = useCallback(
    (char?: string, isRandom = false) => {
      const code = isRandom
        ? defineColorCode.random()
        : defineColorCode.text(char || '');
      const newColor = hslToHex(code * 20, ...saturationAndLuminosity);
      setColor(newColor);
    },
    [defineColorCode],
  );

  // text propが変更された時に色を再計算
  useEffect(() => {
    calculateAndSetColor(text);
  }, [text, calculateAndSetColor]);

  // アバタークリックで色をランダムに変更
  const handleRandomColor = () => {
    calculateAndSetColor(undefined, true);
  };

  return (
    <Avatar
      className={cn('size-10', className)}
      onClick={handleRandomColor}
      style={{ cursor: 'pointer' }}
    >
      <AvatarFallback
        style={{
          backgroundColor: color,
          color: '#000',
          fontWeight: 'bold',
        }}
      >
        {text}
      </AvatarFallback>
    </Avatar>
  );
}
