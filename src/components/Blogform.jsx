const Blogform = ({title, author, url, handleTitle, handleAuthor, handleUrl, handleClick }) => {
    return (
        <>
            <h2>Create New</h2>
            title: <input name="title" value={title} onChange={handleTitle}/> <br/>
            author: <input name="author" value={author} onChange={handleAuthor}/> <br/>
            url: <input name="url" value={url} onChange={handleUrl}/> <br/>
            <button type='button' onClick={handleClick}>create</button>
        </>
    )
}

export default Blogform
