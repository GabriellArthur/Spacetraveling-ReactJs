import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { AiOutlineCalendar } from 'react-icons/Ai';
import { BiTimeFive, BiUser } from 'react-icons/Bi';
import { getPrismicClient } from '../../services/prismic';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>{post.data.title} | SpaceTravelling</title>
        </Head>

        <div>Carregando...</div>
      </>
    );
  }

  function getWordCount(): number {
    const bodyText = post.data.content.reduce((previous, current) => {
      const text = RichText.asText(current.body);
      if (!text) {
        return previous;
      }
      return previous.concat(text);
    }, '');

    const postWords = bodyText.split(' ');

    return postWords.length;
  }

  const date = format(new Date(post.first_publication_date), 'dd MMM yyyy', {
    locale: ptBR,
  });

  const tempo = Math.ceil(getWordCount() / 200);

  return (
    <>
      <Head>
        <title>Home | spacetraveling.</title>
      </Head>

      <main className={styles.container}>
        {post.data.banner.url && (
          <img
            alt="logo"
            src={post.data.banner.url}
            width={1440}
            height={400}
          />
        )}
        <strong>{post.data.title}</strong>
        <time>
          <AiOutlineCalendar className={styles.icons} />

          <p>{date}</p>

          <BiUser className={styles.icons} />
          <p>{post.data.author}</p>

          <BiTimeFive className={styles.icons} />
          <p>{tempo} min</p>
        </time>
        <div>
          {post.data.content.map(content => (
            <article key={content.heading} className={styles.postText}>
              <h2>{content.heading}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(content.body),
                }}
              />
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    Prismic.predicates.at('document.type', 'post'),
    {
      lang: 'pt-br',
      fetch: ['next_page', 'post.title', 'post.subtitle', 'post.author'],
      pageSize: 5,
    }
  );

  const paths = [];

  posts.results.map(post => {
    paths.push({
      params: {
        slug: post.uid,
      },
    });
    return post;
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const slugString = String(slug);
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', slugString, {
    lang: 'pt-br',
  });

  const post = {
    uid: response.uid, 
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content,
    },
  };

  return {
    props: { post },
    redirect: 60 * 30,
  };
};