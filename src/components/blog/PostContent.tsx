'use client';

import DOMPurify from 'isomorphic-dompurify';

export function PostContent({ html }: { html: string }) {
  // Sanitize HTML to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ADD_TAGS: [],
    ADD_ATTR: [],
  });

  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:text-gray-900 prose-headings:font-bold
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900
        prose-ul:my-4 prose-li:my-1
        prose-img:rounded-xl prose-img:my-8
        prose-blockquote:border-brand-500 prose-blockquote:bg-brand-50 prose-blockquote:rounded-r-lg prose-blockquote:py-1
        prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
