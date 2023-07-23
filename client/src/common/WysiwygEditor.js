import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';

export default function WysiwygEditor({ setEditor }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      id="ckEditor"
      config={{
        toolbar: ['bold', 'italic', '|', 'link'],
        link: {
          decorators: {
            openInNewTab: {
              mode: 'manual',
              label: 'Open in a new tab',
              attributes: {
                target: '_blank',
                rel: 'noopener noreferrer',
              },
            },
          },
        },
      }}
      data="<p>Hello</p>"
      onReady={(editor) => {
        setEditor(editor);
      }}
    />
  );
}
