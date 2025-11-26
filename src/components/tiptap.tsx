"use client";

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Underline as UnderlineIcon,
    Subscript as SubscriptIcon,
    Superscript as SuperscriptIcon,
    Minus
} from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface EditorTiptapProps {
    content?: string;
    onChange?: (content: string) => void;
    placeholder?: string;
}

export default function EditorTiptap({ content, onChange, placeholder = 'Digite algo aqui...' }: EditorTiptapProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            Subscript,
            Superscript,
        ],
        content: content || `<p>${placeholder}</p>`,
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[150px] px-4 tiptap-editor',
            },
        },
        onUpdate: ({ editor }) => {
            if (onChange) {
                onChange(editor.getHTML());
            }
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content ?? "");
        }
    }, [content, editor])



    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 border-b p-2 flex flex-wrap gap-1">
                <div className="flex gap-1">
                    <Button
                        type="button"
                        variant={editor?.isActive('bold') ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        title="Negrito (Ctrl+B)"
                    >
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor?.isActive('italic') ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        title="Itálico (Ctrl+I)"
                    >
                        <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor?.isActive('underline') ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleUnderline().run()}
                        title="Sublinhado (Ctrl+U)"
                    >
                        <UnderlineIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor?.isActive('strike') ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleStrike().run()}
                        title="Tachado"
                    >
                        <Strikethrough className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor?.isActive('code') ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleCode().run()}
                        title="Código"
                    >
                        <Code className="h-4 w-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-8" />

                <div className="flex gap-1">
                    <Button
                        type="button"
                        variant={editor?.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                        title="Título 1"
                    >
                        <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor?.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                        title="Título 2"
                    >
                        <Heading2 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor?.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                        title="Título 3"
                    >
                        <Heading3 className="h-4 w-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-8" />

                <div className="flex gap-1">
                    <Button
                        type="button"
                        variant={editor?.isActive('bulletList') ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                        title="Lista com marcadores"
                    >
                        <List className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor?.isActive('orderedList') ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                        title="Lista numerada"
                    >
                        <ListOrdered className="h-4 w-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-8" />

                {/* Alinhamento */}
                <div className="flex gap-1">
                    <Button
                        type="button"
                        variant={editor?.isActive({ textAlign: 'left' }) ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                        title="Alinhar à esquerda"
                    >
                        <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor?.isActive({ textAlign: 'center' }) ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                        title="Centralizar"
                    >
                        <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor?.isActive({ textAlign: 'right' }) ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                        title="Alinhar à direita"
                    >
                        <AlignRight className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor?.isActive({ textAlign: 'justify' }) ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
                        title="Justificar"
                    >
                        <AlignJustify className="h-4 w-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-8" />

                {/* Outros */}
                <div className="flex gap-1">
                    <Button
                        type="button"
                        variant={editor?.isActive('blockquote') ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                        title="Citação"
                    >
                        <Quote className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                        title="Linha horizontal"
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor?.isActive('subscript') ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleSubscript().run()}
                        title="Subscrito"
                    >
                        <SubscriptIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor?.isActive('superscript') ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleSuperscript().run()}
                        title="Sobrescrito"
                    >
                        <SuperscriptIcon className="h-4 w-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-8" />

                {/* Desfazer/Refazer */}
                <div className="flex gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor?.chain().focus().undo().run()}
                        disabled={!editor?.can().undo()}
                        title="Desfazer (Ctrl+Z)"
                    >
                        <Undo className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor?.chain().focus().redo().run()}
                        disabled={!editor?.can().redo()}
                        title="Refazer (Ctrl+Y)"
                    >
                        <Redo className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Área do Editor */}
            <div className="bg-background">
                <EditorContent editor={editor} />
            </div>

            {/* Estilos para o Editor */}
            <style jsx global>{`
                .tiptap-editor h1 {
                    font-size: 2em;
                    font-weight: bold;
                    margin-top: 0.67em;
                    margin-bottom: 0.67em;
                    line-height: 1.2;
                }
                
                .tiptap-editor h2 {
                    font-size: 1.5em;
                    font-weight: bold;
                    margin-top: 0.83em;
                    margin-bottom: 0.83em;
                    line-height: 1.3;
                }
                
                .tiptap-editor h3 {
                    font-size: 1.17em;
                    font-weight: bold;
                    margin-top: 1em;
                    margin-bottom: 1em;
                    line-height: 1.4;
                }
                
                .tiptap-editor ul {
                    list-style-type: disc;
                    padding-left: 1.5em;
                    margin: 1em 0;
                }
                
                .tiptap-editor ol {
                    list-style-type: decimal;
                    padding-left: 1.5em;
                    margin: 1em 0;
                }
                
                .tiptap-editor li {
                    margin: 0.5em 0;
                }
                
                .tiptap-editor blockquote {
                    border-left: 4px solid #e5e7eb;
                    padding-left: 1em;
                    margin: 1em 0;
                    color: #6b7280;
                    font-style: italic;
                }
                
                .tiptap-editor p {
                    margin: 0.5em 0;
                    line-height: 1.6;
                }
                
                .tiptap-editor hr {
                    border: none;
                    border-top: 2px solid #e5e7eb;
                    margin: 2em 0;
                }
                
                .tiptap-editor code {
                    background-color: #f3f4f6;
                    padding: 0.2em 0.4em;
                    border-radius: 3px;
                    font-family: monospace;
                    font-size: 0.9em;
                }
                
                .tiptap-editor strong {
                    font-weight: bold;
                }
                
                .tiptap-editor em {
                    font-style: italic;
                }
                
                .tiptap-editor u {
                    text-decoration: underline;
                }
                
                .tiptap-editor s {
                    text-decoration: line-through;
                }
            `}</style>
        </div>
    );
}