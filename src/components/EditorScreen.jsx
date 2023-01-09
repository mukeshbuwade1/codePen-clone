import React, { useEffect } from 'react'
import Editor from './Editor';
import useLocalStorage from "../hooks/useLocalStore"

export default function EditorScreen() {
    const [html, setHtml] = useLocalStorage("html","")
    const [css, setCss] =useLocalStorage("css","")
    const [js, setJs] = useLocalStorage("js","")
    const [code, setCode] = React.useState("")

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCode(`
                <html>
                <body>${html}</body>
                <style>${css}</style>
                <script>${js}</script>
                </html>
            `)
        }, 250)

        return () => clearTimeout(timeout)
    }, [html, css, js])


    return (
        <section>
            <div className="main__box">
                <div className="pan top-editor">
                    <Editor
                        title={"HTML"}
                        value={html}
                        setValue={setHtml}
                        language={"xml"}
                    />
                    <Editor
                        title={"CSS"}
                        value={css}
                        setValue={setCss}
                        language={"css"}
                    />
                    <Editor
                        title={"JS"}
                        value={js}
                        setValue={setJs}
                        language={"javascript"}
                    />
                </div>
                <div className="pan">
                    <iframe
                        srcDoc={code}
                        title="output"
                        sandbox="allow-scripts"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                    />
                </div>


            </div>
        </section>
    )
}
