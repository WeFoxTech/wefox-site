import { Locale } from '../translations/config';

interface GetstaticPropsParam {
  params: { lang: Locale };
}
interface GetStaticPropsReturn {
  props: object;
}

export type GetstaticProps = (p: GetstaticPropsParam) => Promise<GetStaticPropsReturn>;
