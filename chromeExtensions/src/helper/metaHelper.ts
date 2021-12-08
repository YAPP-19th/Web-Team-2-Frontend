import axios from 'axios';
import cheerio from 'cheerio';

const getCheckedOgImageLink = (url: string, ogImage: string): string => {
  const expTestUrl = /^(https?:\/\/)/;
  const expExecUrl = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
  return expTestUrl.test(ogImage) || ogImage === ''
    ? ogImage
    : `${(expExecUrl.exec(url) as Array<string>)[0]}${ogImage}`;
};

export const getMetaDataByUrl = async (
  url: string,
): Promise<{
  title: string;
  ogImage: string;
  url: string;
  description: string;
}> => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data as string);
  const title = $('title').text() || '';
  const ogImage = getCheckedOgImageLink(
    url,
    $("meta[property='og:image']").attr('content') || '',
  );
  const description =
    $("meta[property='og:description']").attr('content') || '';
  return {
    title,
    ogImage,
    url,
    description,
  };
};
