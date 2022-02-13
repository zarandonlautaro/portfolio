import { Outlet } from "remix";
import type { MetaFunction, LinksFunction } from "remix";

import stylesUrl from "~/styles/work/work.css";

export let meta: MetaFunction = () => {
    return {
        title: "Work",
    };
};

export let links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
    return (
        <div className="about">
            <div className="about__intro">
                <h1>Work</h1>
                <hr />
                <Outlet />
            </div>
        </div>
    );
}
