import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet'

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header/>
      <main style={{ minHeight: "80vh"}}>
        <Toaster 
          position='top-right'
        />
        {children}
      </main>
      <Footer/> 
    </div>
  )
}

Layout.defaultProps = {
  title: "Website tìm nhà trọ",
  description: "MERN project xây dựng website tìm nhà trọ cho sinh viên",
  keywords: "mern, project, node, mongodb",
  author: "Black Tea"
}

export default Layout
