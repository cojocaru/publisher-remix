import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration} from "@remix-run/react";
import {LinksFunction} from "@remix-run/node";
import stylesheet from "~/style.css";

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: stylesheet},
];

export default function App() {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport"
                  content="width=device-width,initial-scale=1"/>
            <title>ptypetone-publisher</title>
            <link rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <Meta/>
            <Links/>
        </head>
        <body>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts/>
        {process.env.NODE_ENV === "development" && <LiveReload/>}
        </body>
        </html>
    );
}
