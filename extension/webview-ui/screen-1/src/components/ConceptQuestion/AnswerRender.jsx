import { VSCodeTextArea } from '@vscode/webview-ui-toolkit/react/index.js'
import React from 'react'
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'https://esm.sh/remark-gfm@4'
const AnswerRender = ({ content }) => {
    return (
        <div className='w-full rounded bg-gray-900 text-white p-4 h-1/2 overflow-auto'>
            <ReactMarkdown
                remarkPlugins={[[remarkGfm]]}
                className='w-fit markdown text-gray-300 bg-gray-900 px-12 py-4'
                children={content}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        console.log(match)
                        return !inline && match ? (
                            <div className='bg-gray-900 rounded-lg flex flex-col'>
                                <SyntaxHighlighter
                                    {...props}
                                    children={String(children).replace(/\n$/, '')}
                                    style={dracula}
                                    language={match[1]}
                                    customStyle={{
                                        padding: "25px",
                                        margin: "0px",
                                    }}
                                    wrapLongLines="true"
                                />
                            </div>
                        ) : (
                            <code {...props} className={className}>
                                {children}
                            </code>
                        )
                    }
                }}
            />
        </div>
    )
}

export default AnswerRender