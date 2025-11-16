import { Button } from "@/components/ui/button"
import { PlusSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  
  return (
    <div className="container mx-auto py-8">
        <Button variant={'default'} className='bg-(--buttonIcon) text-(--textColor) cursor-pointer' asChild>
          <Link href={"/resumes"}>
              <PlusSquare className='size-4'/>
              Create Resume
          </Link>
        </Button>
        <div className="py-8">
          <p className="max-w-prose mx-auto text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis delectus cum ea veniam amet obcaecati voluptate repellendus perferendis qui unde odio quibusdam reprehenderit repudiandae quam debitis labore, laboriosam inventore asperiores eius dicta ullam? Ipsum sapiente beatae similique, repudiandae eveniet sit natus? Vel itaque quia quam ducimus, omnis nesciunt. Tenetur cumque quas doloremque minima, dignissimos similique possimus necessitatibus et tempore alias nisi, quod laudantium molestiae doloribus consequatur vero laboriosam non. Soluta, iusto accusamus. Vel distinctio similique iste soluta minus id voluptatem, totam voluptate nesciunt perspiciatis, porro tenetur rem sed natus voluptatum repellat nisi animi asperiores nostrum? Aliquid, inventore minus. Perspiciatis, qui.</p>
        </div>
    </div>
  );
}
