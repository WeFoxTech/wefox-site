import { localeNames, Locale } from "./config";
import { Namespace } from "./types";


export  interface Params{
  ns?: Namespace[];
  lang?: Locale;
  [key: string]: any;
}

export interface Path {
  params: Params;
}

export interface Paths {
  paths: Path[];
}

// export function withLanguageStaticPaths(
//   ns: Namespace[],
//   params: any[]
// ): () => Paths {
//   let _p = locales
//     .map(l => params.map(p => ({ params: { lang: l, ns, ...p } })))
//     // .flatMap(e => e);
//   return () => ({
//     paths: _p
//   });
// }

export function withLanguageStaticProps(){


}

export function withTranslations( ns: Namespace[], locale:Locale){
  
}