import type { Post } from "@falcon-z/app/_lib/types";
import { cookies } from "next/dist/client/components/headers";
import Image from "next/image";
import Link from "next/link";
import PostActions from "./postActions";

export default function PostContainer({ post }: { post: Post }) {
  const token = cookies().get("token");

  return (
    <div className="w-full   p-4 flex flex-col gap-4 my-4 rounded-2xl border-2 border-gray-700/75">
      <div className="flex flex-col gap-4 text-xl">
        <div className="flex items-center  gap-4">
          <Link href={`/post/${post._id}`}>
            <Image
              src={`https://ui-avatars.com/api/?name=${post.createdBy.name}&background=random`}
              height={64}
              width={64}
              alt=""
              className=" object-center object-cover rounded-full"
            />
          </Link>
          <div>
            <div className="text-2xl font-semibold text-gray-300">
              {post.createdBy.name}
            </div>
            <h4 className="text-lg">{post.title}</h4>
          </div>
        </div>
      </div>
      <Link href={`/post/${post._id}`}>
        <Image
          src={post.imageUri}
          height={400}
          width={300}
          alt=""
          className="object-center  h-auto   aspect-auto w-full rounded-2xl  mx-auto object-contain max-h-[50vh]"
        />
      </Link>
      <div className="">
        <ul className="flex justify-start items-center gap-2">
          {post.tags.map((tag, i) => (
            <li
              key={i}
              className="px-4 py-1 rounded-full bg-gray-800 before:content-['#']"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <PostActions
          token={token?.value}
          id={post._id}
          title={post.title}
          likes={post.likes}
        />
      </div>
    </div>
  );
}
