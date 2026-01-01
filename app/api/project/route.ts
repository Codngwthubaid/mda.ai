import { generateProjectName } from "@/app/action/action";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    const session = await getKindeServerSession();
    const user = await session?.getUser();

    if (!user) return new Response("Unauthorized", { status: 401 });
    if (!prompt)
      return new Response("Bad Request: Missing prompt", { status: 400 });

    const userId = user.id;

    // action function
    const projectName = await generateProjectName(prompt);

    const project = await prisma.project.create({
      data: {
        name: projectName,
        userId: userId,
      },
    });

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error in POST /api/project:", error);
    return NextResponse.json({
      error: "Failed to create project",
      status: 500,
    });
  }
}


export async function GET(request: Request) {
  try {
   
    const session = await getKindeServerSession();
    const user = await session?.getUser();
    
    if (!user) return new Response("Unauthorized", { status: 401 });

    const userId = user.id;

    const projects = await prisma.project.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: projects,
    });

  } catch (error) {
    console.error("Error in GET /api/project:", error);
    return NextResponse.json({
      error: "Failed to fetch projects",
      status: 500,
    });
  }
}