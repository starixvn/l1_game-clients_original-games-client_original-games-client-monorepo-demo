/* eslint-disable @next/next/no-sync-scripts */
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { buildVersion } from "@shared/constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends Document<{ headScript?: string }> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        // Extract gameId from the request URL path dynamically
        const url = ctx.req?.url || '';
        const gameIdMatch = url.match(/\/game-(\d+)/);
        const gameId = gameIdMatch ? gameIdMatch[1] : '148';

        // Use dynamic gameId for config script
        const headScript = `/game-${gameId}/c.js`;
        return { ...initialProps, headScript, gameId };
    }

    render() {
        const headScript = (this.props as any)?.headScript || "/game-148/c.js";
        const gameId = (this.props as any)?.gameId || '148';
        const configFileWithVersion = `${headScript}?${buildVersion}`;

        return (
            <Html>
                <Head>
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    {/* Inject gameId for client-side use */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.__GAME_ID__ = '${gameId}';`
                        }}
                    />
                    <script type="text/javascript" src={configFileWithVersion}></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
