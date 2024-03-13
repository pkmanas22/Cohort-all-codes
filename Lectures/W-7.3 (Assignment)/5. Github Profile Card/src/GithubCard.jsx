

export default function GithubCard({ user }) {
    const {
        html_url,
        avatar_url,
        name,
        login,
        location,
        followers,
        following,
        public_repos,
        public_gists,
        blog,
        twitter_username,
    } = user;


    if (!login) {
        return <div>No Profile found</div>
    }

    return (
        <div style={{ width: '400px', height: '500px', border: '2px solid black' }}>
            <div className="coverPic" style={{ width: '400px', height: '150px', background: '#7df0f0' }}>
                <a href={html_url} target='_blank' style={{ position: 'relative', left: '150px' }}>Visit Profile</a>
            </div>

            <img style={{ width: '150px', height: '150px', top: '-90px', borderRadius: "50%", position: 'relative' }} src={avatar_url} alt="" />

            <div className="content" style={{ width: '400px', height: '350px', position: 'relative', top: '-85px', }}>
                <div>
                    <h2>{name}</h2>
                    <p style={{ marginTop: '-20px' }}>({login})</p>
                    <p style={{ marginTop: '-15px' }}>{location}</p>
                    <div style={{ display: 'flex', padding: '20px', borderTop: '1px solid grey', justifyContent: 'space-between' }}>
                        <div>
                            <h2>{followers}</h2>
                            <p>Followers</p>
                        </div>
                        <div>
                            <h2>{following}</h2>
                            <p>Following</p>
                        </div>
                        <div>
                            <h2>{public_repos}</h2>
                            <p>Public Repos</p>
                        </div>
                        <div>
                            <h2>{public_gists}</h2>
                            <p>Public Gists</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', padding: '20px', justifyContent: 'space-evenly' }}>
                        <a href={(twitter_username ? `https://twitter.com/${twitter_username}` : "")} target='_blank'>Twitter</a>
                        <a href={blog ? blog : ""} target='_blank'>Blog</a>
                        <a href={html_url} target='_blank'>Github</a>
                    </div>
                </div>
            </div>
        </div >
    )
}