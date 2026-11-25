import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 bg-[#F6F7F8] text-[#111317] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-[#FFFFFF] border border-[#E1E4E8] rounded-[2px] p-8 text-center space-y-4">
        <span className="font-mono-tabular text-xs font-bold uppercase tracking-widest text-[#D61F26]">
          Erro 404
        </span>
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight">
          Página não encontrada
        </h1>
        <p className="text-sm text-[#5A6270]">
          A camisa ou rota que você procurou não está disponível. Explore as ligas abaixo.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            href="/nfl"
            className="px-4 py-2.5 rounded-[2px] bg-[#111317] text-white text-xs font-bold uppercase tracking-wider"
          >
            Ir para NFL
          </Link>
          <Link
            href="/nba"
            className="px-4 py-2.5 rounded-[2px] bg-[#D61F26] text-white text-xs font-bold uppercase tracking-wider"
          >
            Ir para NBA
          </Link>
        </div>
      </div>
    </div>
  );
}
