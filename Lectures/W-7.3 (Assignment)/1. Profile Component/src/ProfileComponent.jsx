
export default function ProfileComponent({ profile }) {

    return (
        <div style={{ width: '400px', height: '500px', border: '2px solid black' }}>
            <div className="coverPic" style={{ width: '400px', height: '150px', background: '#7df0f0' }}>

            </div>

            <img style={{ width: '125px', height: '125px', top: '131px', position: 'absolute', left: '182px' }} src={profile.profileUrl} alt="" />

            <div className="content" style={{ width: '400px', height: '350px' }}>
                <div style={{ position: 'relative', top: '50px' }}>
                    <h2>{profile.name} (<span>{profile.age}</span>)</h2>
                    <p>{profile.address}</p>
                    <div style={{ display: 'flex', padding: '20px', position: 'relative', top: '50px', 'border-top': '1px solid grey', 'justify-content': 'space-between' }}>
                        <div>
                            <h2>{profile.followers}</h2>
                            <p>Followers</p>
                        </div>
                        <div>
                            <h2>{profile.likes}</h2>
                            <p>Likes</p>
                        </div>
                        <div>
                            <h2>{profile.photos}</h2>
                            <p>Photos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}