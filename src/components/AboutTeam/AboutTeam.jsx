/* --------------------------------Imports--------------------------------*/

// css
import './AboutTeam.css';

/* --------------------------------Function--------------------------------*/

function AboutTeam() {
   const teamMembers= [
       { name:'Polina Stepanova',
       role: 'Frontend/Backend Developer',
       bio: 'Passionate about building engaging user experiences with a strong focus on Javascript and React',
       github: 'https://github.com/realpolya',
       image: ''
   },
       {
           name:'Paola Soria',
           role: 'Frontend/Backend Developer',
           bio: 'Specializes in server-side logic, databases, and API integration using Node.Js and Express',
           github: 'https://github.com/paolasoria0597',
           image:''
       },
       {
           name: 'Mandy Decamp',
           role: 'Frontend/Backend Developer',
           bio:  'Enjoys bridging the gap between backend and frontend with expertise in the MERN stack',
           github: 'https://github.com/Mandy2114',
           image:''
       }
       ];

    return (
      <main id="about-team-main">
          <div className="about-me">
          <h2> Hi, We're a team of passionate developers</h2>
          <p> Our team is dedicated to building high quality applications with a focus on collaboration and innovation. P.S. we also love tasty recipes! </p>

          <h3> Meet the team </h3>
          <div className="team">
              {teamMembers.map((member, index) =>(
                  <div className="team-member" key={index}>
                        <h4>{member.name}</h4>
                         <p><strong>Role:</strong> {member.role}</p>
                         <p>{member.bio}</p>
                      <div className= "links">
                          < a href={ member.github} target="_blank" rel="noopener noreferrer"> Visit Github Account</a>
                          < a href={ member.image} target="_blank" rel="noopener noreferrer"></a>
                      </div>

                  </div>
              ))}
          </div>
          </div>
      </main>
    );

  };

/* --------------------------------Exports--------------------------------*/

export default AboutTeam;