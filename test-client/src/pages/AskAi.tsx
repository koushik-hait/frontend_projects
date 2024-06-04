import withAuth from "@/components/WithAuth";
import AskAiForm from "@/components/forms/AskAiForm";
import React from "react";

const AskAi = () => {
  return (
    <div className="min-h-screen p-8 text-zinc-900 bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="bg-white w-full mx-auto rounded-xl min-h-fit shadow-sm border border-black/20 overflow-hidden grid grid-cols-[16rem_1fr] ">
        <aside className="bg-zinc-50 border-r border-r-zinc-100 p-4">
          <div className="flex gap-2 group">
            <button className="w-3 h-3 rounded-full bg-zinc-300 group-hover:bg-red-400"></button>
            <button className="w-3 h-3 rounded-full bg-zinc-300 group-hover:bg-yellow-400"></button>
            <button className="w-3 h-3 rounded-full bg-zinc-300 group-hover:bg-green-400"></button>
          </div>
        </aside>
        <main className="p-4">
          <AskAiForm />
        </main>
      </div>
    </div>
  );
};

export default withAuth(AskAi);
