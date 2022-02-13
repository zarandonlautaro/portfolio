import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
type IndexData = {
    resources: Array<{ name: string; url: string }>;
    demos: Array<{ name: string; to: string }>;
    posts: Array<{ name: string; to: string }>;
};
import { Canvas, useFrame } from "@react-three/fiber";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
    let data: IndexData = {
        resources: [
            {
                name: "Remix Docs",
                url: "https://remix.run/docs",
            },
            {
                name: "React Router Docs",
                url: "https://reactrouter.com/docs",
            },
            {
                name: "Remix Discord",
                url: "https://discord.gg/VBePs6d",
            },
        ],
        demos: [
            {
                to: "demos/actions",
                name: "Actions",
            },
            {
                to: "demos/about",
                name: "Nested Routes, CSS loading/unloading",
            },
            {
                to: "demos/params",
                name: "URL Params and Error Boundaries",
            },
        ],
        posts: [
            {
                to: "posts",
                name: "Posts",
            },
            {
                to: "admin",
                name: "Admin",
            },
        ],
    };

    // https://remix.run/api/remix#json
    return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
    return {
        title: "Lautaro Zarandón",
        description: "Front end developer",
    };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
    let data = useLoaderData<IndexData>();

    function Box(props: JSX.IntrinsicElements["mesh"]) {
        const ref = useRef<THREE.Mesh>(null!);
        const [hovered, hover] = useState(false);
        const [clicked, click] = useState(false);
        useFrame((state, delta) => (ref.current.rotation.x += 0.01));
        return (
            <mesh
                {...props}
                ref={ref}
                scale={clicked ? 1.5 : 1}
                onClick={(event) => click(!clicked)}
                onPointerOver={(event) => hover(true)}
                onPointerOut={(event) => hover(false)}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
            </mesh>
        );
    }

    return (
        <div className="remix__page">
            <main>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {
                            scale: 0.8,
                            opacity: 0,
                        },
                        visible: {
                            scale: 1,
                            opacity: 1,
                            transition: {
                                delay: 0.4,
                            },
                        },
                    }}
                >
                    <h1>Hi, I’m Lautaro. Nice to meet you.</h1>
                    <p>Lautaro is a web developer based in Argentina</p>
                </motion.div>
                {/* <motion.li
                    // key={id}
                    className="card"
                    whileHover={{
                        position: "relative",
                        zIndex: 1,
                        background: "white",
                        scale: [1, 1.4, 1.2],
                        rotate: [0, 10, -10, 0],
                        transition: {
                            duration: 0.2,
                        },
                    }}
                >
                    Projects
                </motion.li> */}
            </main>
            <aside>
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} />
                </Canvas>
            </aside>
            {/* <aside>
                <h2>Making a blog</h2>
                <ul>
                    {data.posts.map((demo) => (
                        <li key={demo.to} className="remix__page__resource">
                            <Link to={demo.to} prefetch="intent">
                                {demo.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <h2>Demos In This App</h2>
                <ul>
                    {data.demos.map((demo) => (
                        <li key={demo.to} className="remix__page__resource">
                            <Link to={demo.to} prefetch="intent">
                                {demo.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <h2>Resources</h2>
                <ul>
                    {data.resources.map((resource) => (
                        <li
                            key={resource.url}
                            className="remix__page__resource"
                        >
                            <a href={resource.url}>{resource.name}</a>
                        </li>
                    ))}
                </ul>
            </aside> */}
        </div>
    );
}
