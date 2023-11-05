import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/db";
import Todo from "@/models/todo";

connect();

function getIdFromPathname(s: String) {
  let parts = s.split("/");
  return parts[parts.length - 1];
}

export async function GET(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    const id = getIdFromPathname(path);

    const todo = await Todo.findOne({ id });

    console.log(todo);

    return NextResponse.json({ msg: "Ok", success: true, todo });
  } catch (error) {
    return NextResponse.json({ msg: "Issue happened" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    const id = getIdFromPathname(path);

    await Todo.deleteOne({ id });

    return NextResponse.json({ msg: "Ok", success: true });
  } catch (error) {
    return NextResponse.json({ msg: "Issue happened" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    const id = getIdFromPathname(path);

    const reqBody = await request.json();
    const { desc, completed } = reqBody;

    console.log(reqBody);

    const editedTodo = await Todo.updateOne({ id, desc, completed });

    return NextResponse.json({ msg: "Ok", success: true });
  } catch (error) {
    return NextResponse.json({ msg: "Issue happened" }, { status: 500 });
  }
}
