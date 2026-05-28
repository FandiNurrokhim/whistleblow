import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

function LimitedText({ text, limit }) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return "-";

  const words = text.split(' ');
  const visibleText = isExpanded ? text : words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '');
  const toggleText = isExpanded ? t('global.showLess') : t('global.showMore');

  return (
    <span>
      {parse(visibleText)}
      {words.length > limit && (
        <button
          type="button"
          className="text-blue-500 underline text-xs ml-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {toggleText}
        </button>
      )}
    </span>
  );
}

export default LimitedText;
