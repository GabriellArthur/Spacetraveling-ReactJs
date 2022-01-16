import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Prismic from '@prismicio/client'

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Header from '../components/Header';
import { FiCalendar, FiUser } from "react-icons/fi";

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({postsPagination}: HomeProps) {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [pagination, setPagination] = useState<string>(postsPagination.next_page);

  function loadMorePosts(link: string | null){
    if(pagination){
      fetch(link)
      .then(response => response.json())
      .then(data => {
        const newPosts = data.results.map(result => {

          return {
            uid: result.uid,
            first_publication_date: result.first_publication_date,
            data: {
              title: result.data.title,
              subtitle: result.data.subtitle,
              author: result.data. author,
            }
          }
        })

        setPosts([...posts, ...newPosts])
        setPagination(data.next_page)
      })
    }

  }

  return (
    <>
      <Head>
        <title>Home | spacetraveling.</title>
      </Head>

      <main className={styles.mainContainer}>
        <Header/>

        <section className={commonStyles.containerContent}>

          <div className={styles.postsList}>
            { posts.map(post => (
              <div key={post.uid} className={styles.post}>
                <Link href={`/post/${post.uid}`}>
                  <a>
                    <h1>{post.data.title}</h1>
                  </a>
                </Link>
                <p>{post.data.subtitle}</p>
                <div className={styles.postFooter}>
                  <span>
                    <FiCalendar/><time>{
                      format( new Date(post.first_publication_date), "d MMM yyyy",
                      {
                        locale: ptBR,
                      })
                    }</time>
                  </span>

                  <span>
                    <FiUser/>{post.data.author}
                  </span>
                </div>
              </div>
            )) }
          </div>

          { pagination ? <button type='button' className={styles.loadMorePosts} onClick={() => loadMorePosts(pagination)}>Carregar mais posts</button> : null }

        </section>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
  ], {
    orderings : '[document.first_publication_date desc]',
    fetch: ['post.title', 'post.subtitle', 'post.author'],
    pageSize: 2,
  });

  const posts = response.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      }
    }
  })

  return {
    props: {
      postsPagination: {
        next_page: response.next_page,
        results: posts,
      }
    },
    revalidate: 1 * 1 * 1, // 30m = second * minute * hour
  }
};