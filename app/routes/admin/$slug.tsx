import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getPost } from "~/post";
import invariant from "tiny-invariant";

export let loader: LoaderFunction = async ({ params }) => {
    invariant(params.slug, "che estaba esperando un params.slug");
    return getPost(params.slug);
};

export default function AdminSlug() {
    let post = useLoaderData();
    console.log(post);
    return <div dangerouslySetInnerHTML={{ __html: post.html }} />;
}
