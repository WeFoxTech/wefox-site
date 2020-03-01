
export default withLocale(MDXContent)

export const hello = ()=>{

  return 'world'
}


export async function unstable_getStaticPaths() {
  return {
    paths: ['en', 'zh'].map(l => ({ params: { lang: l } })),
  };
}

export const unstable_getStaticProps = async ({ params }) => {
  const { lang } = params;

  return {
    props: {
      locale: lang,
      translations: locales[lang]['common'],
    },
  };
};
