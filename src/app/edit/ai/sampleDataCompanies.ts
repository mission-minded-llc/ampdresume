export const sampleDataCompanies = [
  {
    id: "cm6agya6f0005le03m000i26v",
    name: "The Real Deal",
    location: "New York, NY (Remote)",
    startDate: "1643760000000",
    endDate: "1722556800000",
    positions: [
      {
        id: "cm6agz6t9000dl503kmqa7lxl",
        title: "Senior Full Stack Developer",
        startDate: "1646100000000",
        endDate: "1725156000000",
        projects: [
          {
            id: "cm6g5z5k30001jp03lxmw8sa0",
            name: "Designed an API to manage and share internal data with a separate CMS.",
            description: null,
            sortIndex: 2,
            skillsForProject: [
              {
                id: "cm6rn6w8o000djl03ddf0734y",
                description: null,
                skillForUser: {
                  id: "cm6agmi7d000jic03iie8m002",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agef91001wq7mx0nz0tswe",
                    name: "SQLAlchemy",
                    icon: "devicon-plain:sqlalchemy",
                  },
                },
              },
              {
                id: "cm6rn74mm0001l803tyie7wee",
                description: null,
                skillForUser: {
                  id: "cm6agkyu9000bic03lfo1zb1j",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668e6mc04t1q8n12dwno2rt",
                    name: "PostgreSQL",
                    icon: "devicon:postgresql",
                  },
                },
              },
              {
                id: "cm6rn79wa0003l803to94as3g",
                description: null,
                skillForUser: {
                  id: "cm6aesp39000di503vgtn4a4t",
                  icon: "",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6684b9b02f0q8n1e0dfgj13",
                    name: "Flask",
                    icon: "mdi:flask",
                  },
                },
              },
              {
                id: "cm6rn7gwb0005l803sqzn5t5t",
                description: null,
                skillForUser: {
                  id: "cm6agkjoo0007k3038xgcosp2",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agdlhe001tq7mxg28w8h00",
                    name: "pytest",
                    icon: "file-icons:pytest",
                  },
                },
              },
              {
                id: "cm6rn7obh0007l803cppym0m2",
                description: null,
                skillForUser: {
                  id: "cm6aep9bf0007i503albfvbsq",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668eyaj04zsq8n1ncmo4s05",
                    name: "Python",
                    icon: "devicon:python",
                  },
                },
              },
              {
                id: "cm6rn7rik0009l803jxdy8sb1",
                description: null,
                skillForUser: {
                  id: "cm6aelain0009l103k2hc5ocu",
                  icon: "logos:docker-icon",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6681z2o01uhq8n1k0kot5qo", name: "Docker", icon: "" },
                },
              },
              {
                id: "cm6rn8i52000bl803n8ygnw84",
                description: null,
                skillForUser: {
                  id: "cm6g6m2vl0003kv03xd2ufh0x",
                  icon: "eos-icons:project-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5kqii001monncks4pvow7",
                    name: "Project Management",
                    icon: "eos-icons:project-outlined",
                  },
                },
              },
              {
                id: "cm6rn8vk2000dl8031929tvax",
                description: null,
                skillForUser: {
                  id: "cm6aes52y0009i503ljxfjqbq",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6688dzj03ekq8n1sszbthoy",
                    name: "Kubernetes",
                    icon: "devicon:kubernetes",
                  },
                },
              },
              {
                id: "cm6rn9a7x000fl803ljnqdgen",
                description: null,
                skillForUser: {
                  id: "cm6aeaekw0001i503avpsv283",
                  icon: "mynaui:api-solid",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm691zuep0010q0ohjkqrs49c",
                    name: "API Development",
                    icon: "mynaui:api-solid",
                  },
                },
              },
            ],
          },
          {
            id: "cm6g544oe0001if03f2bdbdf1",
            name: "Improved stability and performance of online publications on web and mobile (3M+ monthly visitors).",
            description:
              '<p dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">The Real Deal (TRD) runs a high-traffic real estate news website&nbsp;</span><a href="https://therealdeal.com/" target="_blank" rel="noopener noreferrer" class="editorLink"><span style="white-space: pre-wrap;">https://therealdeal.com</span></a><span style="white-space: pre-wrap;">. This is a Next.js website powered by headless WordPress in the back-end. It is hosted in AWS using custom-build Docker images in Elastic Container Registry (ECR), deployed to Elastic Kubernetes Service (EKS).</span></p><h4 dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">Challenge: Pod Resources</span></h4><p dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">The back-end WordPress installation is home to over 100,000 articles and tens of thousands of tags. Dozens of writers and editors can access the site to create and organize content.</span></p><p dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">One challenge we faced was to allocate the correct amount of resources per Kubernetes pod, as well as to ensure the correct min/max number of pods are available for WordPress. With some light trail &amp; error, we were able to iron this out and keep the site running smoothly for back-end editors and staff as well as front-end users.</span></p><p dir="ltr" style="text-align: start;"><img src="https://media.openresume.org/assets/user/cm671iiwm0000i0034djngchg/1738048651127-Screenshot%202025-01-27%20at%2011.16.24%E2%80%AFPM.png" alt="Image" width="inherit" height="inherit"></p><p dir="ltr"><b><strong class="css-in3yi3" style="white-space: pre-wrap;">Challenge: Checking Work</strong></b></p><p dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">Initially this project was outsourced to a contractor. At the time, I was working with the internal team, focused on a different project.</span></p><p dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">When it was nearly time to be delivered, I checked the state of the work out of curiosity. I had hoped to learn a new technique or two from the developers. I was surprised, however, to find out that the bulk of this project didn\'t appear to follow healthy coding standards.</span></p><p dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">Based on what I found, I was nervous about the success of this project. This work was meant to be a milestone transition for the company\'s digital footprint: it combined seven CMS platforms for various real estate markets into a single powerful website to serve millions of visitors.</span></p><p dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">Fearing a potential botched launch, I brought up my concerns to management and I presented a plan to help get the project back on track. I recommended we:</span></p><ul><li value="1"><span style="white-space: pre-wrap;">Follow React and Next.js best practices.</span></li><li value="2"><span style="white-space: pre-wrap;">Add tests with Jest in the front-end and PHPUnit in the back-end to cover critical functionality to start, then backfill additional coverage post-launch.</span></li><li value="3"><span style="white-space: pre-wrap;">Improve TypeScript usage and remove loose "any" definitions.</span></li><li value="4"><span style="white-space: pre-wrap;">Follow lint rules and guidelines with ESLint in front-end, and WordPress Coding Standards in the back-end.</span></li><li value="5"><span style="white-space: pre-wrap;">Organize code and files for clarity in front-end and back-end repositories.</span></li><li value="6"><span style="white-space: pre-wrap;">Implement a continuous integration (CI) pipeline to ensure all new pull requests don\'t break existing functionality.</span></li></ul><p dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">While we experienced a bit of a setback to the expected launch timeline, I was much more confident in the launch of this project after we fixed the codebase. The code quality and development improvements greatly aided our future development and maintenance on this project</span></p>',
            sortIndex: 0,
            skillsForProject: [
              {
                id: "cm6g54g900001jr03qmkgghfg",
                description:
                  '<p dir="ltr"><span style="white-space: pre-wrap;">TRD requires custom GraphQL resolvers to handle a myriad of custom data types.</span></p>',
                skillForUser: {
                  id: "cm68kdnod000dkv03ixdbobia",
                  icon: "vscode-icons:file-type-graphql",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6685ic402piq8n1j3xodr6v", name: "GraphQL", icon: "" },
                },
              },
              {
                id: "cm6g54jrt0003jr03vy6i4o09",
                description: null,
                skillForUser: {
                  id: "cm6aeas150007l103xge5wdrv",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm69242wc0013q0oh3j8ksjh1",
                    name: "Headless WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
              {
                id: "cm6g54t8b0005jr03ayix39y3",
                description: null,
                skillForUser: {
                  id: "cm6agilnh0003ic03acc7mkkv",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agcw2b001pq7mx2nf6maa4",
                    name: "Next.js",
                    icon: "akar-icons:nextjs-fill",
                  },
                },
              },
              {
                id: "cm6g55bou0003l503cpxjxcvm",
                description: null,
                skillForUser: {
                  id: "cm6aes52y0009i503ljxfjqbq",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6688dzj03ekq8n1sszbthoy",
                    name: "Kubernetes",
                    icon: "devicon:kubernetes",
                  },
                },
              },
              {
                id: "cm6g5570c0001l503zppr4hnv",
                description: "<p><br></p>",
                skillForUser: {
                  id: "cm6aglbk6000dic03py3a1clk",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6ag8yaw001gq7mxqu0mqfvc",
                    name: "Amazon CloudFront",
                    icon: "logos:aws-cloudfront",
                  },
                },
              },
            ],
          },
          {
            id: "cm6g5yyry0001l503qil7h2q7",
            name: "Built a quarantine system to analyze potentially bad data for refinement/cleansing.",
            description: null,
            sortIndex: 1,
            skillsForProject: [
              {
                id: "cm6rnhaxo0001ic03gsja9845",
                description: null,
                skillForUser: {
                  id: "cm6g6m2vl0003kv03xd2ufh0x",
                  icon: "eos-icons:project-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5kqii001monncks4pvow7",
                    name: "Project Management",
                    icon: "eos-icons:project-outlined",
                  },
                },
              },
              {
                id: "cm6rnhgmn0003ic032kmqpbfz",
                description: null,
                skillForUser: {
                  id: "cm6aesitq000bi5034zviu73e",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667w3ik00fdq8n1vp4tvphz",
                    name: "Apache Airflow",
                    icon: "logos:airflow-icon",
                  },
                },
              },
              {
                id: "cm6rnhk330005ic032d3esiyy",
                description: null,
                skillForUser: {
                  id: "cm68k4bma0005kv03eu4be4up",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668m40g06qgq8n10imipy0c",
                    name: "WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
              {
                id: "cm6rnhqaj0007ic03j0pnm1fg",
                description: null,
                skillForUser: {
                  id: "cm6aeaekw0001i503avpsv283",
                  icon: "mynaui:api-solid",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm691zuep0010q0ohjkqrs49c",
                    name: "API Development",
                    icon: "mynaui:api-solid",
                  },
                },
              },
              {
                id: "cm6rnhxsf0009ic03jctgvr7z",
                description: null,
                skillForUser: {
                  id: "cm6aep9bf0007i503albfvbsq",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668eyaj04zsq8n1ncmo4s05",
                    name: "Python",
                    icon: "devicon:python",
                  },
                },
              },
              {
                id: "cm6rnifec000bic032wydonpe",
                description: null,
                skillForUser: {
                  id: "cm6aelain0009l103k2hc5ocu",
                  icon: "logos:docker-icon",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6681z2o01uhq8n1k0kot5qo", name: "Docker", icon: "" },
                },
              },
              {
                id: "cm6rnikqr000dic03atb60m53",
                description: null,
                skillForUser: {
                  id: "cm6agkyu9000bic03lfo1zb1j",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668e6mc04t1q8n12dwno2rt",
                    name: "PostgreSQL",
                    icon: "devicon:postgresql",
                  },
                },
              },
            ],
          },
          {
            id: "cm6g5zmc80001jz03chj0wm1g",
            name: "Configured QA browser automation and reporting for the QA team.",
            description: null,
            sortIndex: 3,
            skillsForProject: [
              {
                id: "cm6rnaank0001jr03mh113awu",
                description: null,
                skillForUser: {
                  id: "cm6rmdhr40005ju03n5g4k6k6",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agb8vp001oq7mxcsj03ztn",
                    name: "GitHub Actions",
                    icon: "mdi:github",
                  },
                },
              },
              {
                id: "cm6rnadby0003jr0301almk4h",
                description: null,
                skillForUser: {
                  id: "cm6aelain0009l103k2hc5ocu",
                  icon: "logos:docker-icon",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6681z2o01uhq8n1k0kot5qo", name: "Docker", icon: "" },
                },
              },
              {
                id: "cm6rnam500005jr03xynrsosj",
                description: null,
                skillForUser: {
                  id: "cm6agia1r0001ic03vk61elso",
                  icon: "oui:integration-general",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6aga2k3001lq7mxlgcnf9ou",
                    name: "Continuous Integration",
                    icon: "oui:integration-general",
                  },
                },
              },
              {
                id: "cm6rnb0l10007jr0344ft2egs",
                description: null,
                skillForUser: {
                  id: "cm6aeup79000dl103zf0oj42y",
                  icon: "skill-icons:selenium",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm668h9go05k2q8n19pcwmm6o", name: "Selenium", icon: "" },
                },
              },
            ],
          },
          {
            id: "cm6g5zs7f0001ii03di0onwjq",
            name: "Designed a performance test suite for web and API endpoints for the QA team to utilize.",
            description: null,
            sortIndex: 4,
            skillsForProject: [
              {
                id: "cm6rnb9140009jr03hszpg6ve",
                description: null,
                skillForUser: {
                  id: "cm6aelain0009l103k2hc5ocu",
                  icon: "logos:docker-icon",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6681z2o01uhq8n1k0kot5qo", name: "Docker", icon: "" },
                },
              },
              {
                id: "cm6rnboz3000bjr033zr77at0",
                description: null,
                skillForUser: {
                  id: "cm6rmdhr40005ju03n5g4k6k6",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agb8vp001oq7mxcsj03ztn",
                    name: "GitHub Actions",
                    icon: "mdi:github",
                  },
                },
              },
              {
                id: "cm6rnbzq3000djr03wzdqovie",
                description: null,
                skillForUser: {
                  id: "cm6aeu2fz000bl10355u14rqe",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667w54f00frq8n1fpntf0b7",
                    name: "Apache JMeter",
                    icon: "simple-icons:apachejmeter",
                  },
                },
              },
            ],
          },
          {
            id: "cm6g5zxsm0001jg03qjx4r56b",
            name: "Optimized web scrapers and improved development processes for the data team.",
            description: null,
            sortIndex: 5,
            skillsForProject: [
              {
                id: "cm6rnca90000fjr037r851qig",
                description: null,
                skillForUser: {
                  id: "cm6aeup79000dl103zf0oj42y",
                  icon: "skill-icons:selenium",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm668h9go05k2q8n19pcwmm6o", name: "Selenium", icon: "" },
                },
              },
              {
                id: "cm6rncgqt000hjr03snvhqh83",
                description: null,
                skillForUser: {
                  id: "cm6aep9bf0007i503albfvbsq",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668eyaj04zsq8n1ncmo4s05",
                    name: "Python",
                    icon: "devicon:python",
                  },
                },
              },
              {
                id: "cm6rncpw0000jjr03e9jp1cmq",
                description: null,
                skillForUser: {
                  id: "cm6agiumt0005ic033f6jljig",
                  icon: "devicon:vscode",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agf73a001yq7mx0fbk48nt",
                    name: "VS Code Dev Containers",
                    icon: "devicon:vscode",
                  },
                },
              },
              {
                id: "cm6rncvap000ljr03g5chq9md",
                description: null,
                skillForUser: {
                  id: "cm6aesitq000bi5034zviu73e",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667w3ik00fdq8n1vp4tvphz",
                    name: "Apache Airflow",
                    icon: "logos:airflow-icon",
                  },
                },
              },
              {
                id: "cm6rncz2u000njr03buivgxo1",
                description: null,
                skillForUser: {
                  id: "cm6rmdhr40005ju03n5g4k6k6",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agb8vp001oq7mxcsj03ztn",
                    name: "GitHub Actions",
                    icon: "mdi:github",
                  },
                },
              },
              {
                id: "cm6rnd9c0000pjr03znalrfyn",
                description: null,
                skillForUser: {
                  id: "cm6agkjoo0007k3038xgcosp2",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agdlhe001tq7mxg28w8h00",
                    name: "pytest",
                    icon: "file-icons:pytest",
                  },
                },
              },
              {
                id: "cm6rndeq6000rjr03fh9d04hw",
                description: null,
                skillForUser: {
                  id: "cm6agm5ib000fic03r1actafv",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agdd2f001rq7mx1lilru9o",
                    name: "Playwright",
                    icon: "devicon:playwright",
                  },
                },
              },
              {
                id: "cm6rne1gz000tjr037oj1mirj",
                description: null,
                skillForUser: {
                  id: "cm6aelain0009l103k2hc5ocu",
                  icon: "logos:docker-icon",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6681z2o01uhq8n1k0kot5qo", name: "Docker", icon: "" },
                },
              },
              {
                id: "cm6rned8w000vjr032okl16wn",
                description: null,
                skillForUser: {
                  id: "cm68k4vl60009kv033c3deq5b",
                  icon: "ant-design:linux-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6688xv703jdq8n1iy33olzm", name: "Linux", icon: "" },
                },
              },
            ],
          },
          {
            id: "cm6g5r9040001l703f1av86bk",
            name: "Set up continuous integration workflows for front-end, back-end, and data applications.",
            description:
              '<p dir="ltr"><span style="white-space: pre-wrap;">I set up numerous automated processes for TRD to improve the development and deployment process for multiple products.</span></p><p dir="ltr"><span style="white-space: pre-wrap;">For the TRD Pro data platform and TRD News, I helped implement the following in CI for frontend and backend:</span></p><ul><li value="1"><span style="white-space: pre-wrap;">Prettier</span></li><li value="2"><span style="white-space: pre-wrap;">ESLint</span></li><li value="3"><span style="white-space: pre-wrap;">Jest with coverage reports</span></li><li value="4"><span style="white-space: pre-wrap;">Build (ensure a successful </span><code spellcheck="false" style="white-space: pre-wrap;"><span class="css-8eyu93">npm run build</span></code><span style="white-space: pre-wrap;"> process)</span></li><li value="5"><span style="white-space: pre-wrap;">PHPUnit</span></li><li value="6"><span style="white-space: pre-wrap;">PHPLint with WordPress Coding Standards (WPCS)</span></li></ul><p dir="ltr"><span style="white-space: pre-wrap;">For TRD Data ingestion and scraping platforms, I utilized the following to set up CI processes:</span></p><ul><li value="1"><span style="white-space: pre-wrap;">Pylint and Black Formatter</span></li><li value="2"><span style="white-space: pre-wrap;">Pytest</span></li></ul><p dir="ltr"><span style="white-space: pre-wrap;">For TRD News and Pro, I helped the QA team by setting up the configuration to allow the test suite to run within the context of GitHub Actions workflows, using a Dockerized Selenium Webdriver setup with multiple browsers in Selenium Hub.</span></p>',
            sortIndex: 6,
            skillsForProject: [
              {
                id: "cm6rm5xcd0001ju031x4734h0",
                description:
                  '<p dir="ltr"><span style="white-space: pre-wrap;">I was responsible for setting up and improving numerous CI processes within TRD. I worked with the teams to ensure that we have proper linting, formatting, and testing set up within GitHub Workflows.</span></p>',
                skillForUser: {
                  id: "cm6agia1r0001ic03vk61elso",
                  icon: "oui:integration-general",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6aga2k3001lq7mxlgcnf9ou",
                    name: "Continuous Integration",
                    icon: "oui:integration-general",
                  },
                },
              },
            ],
          },
          {
            id: "cm6g5zedf0005l703i14ex49m",
            name: "Identified infrastructure adjustments to reduce monthly AWS costs by 50%.",
            description: null,
            sortIndex: 7,
            skillsForProject: [
              {
                id: "cm6rnisz9000fic03x3wtpdhv",
                description: null,
                skillForUser: {
                  id: "cm6rngbx20001l4033qfr6d24",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6ag8yfu001iq7mx8d38jcqg", name: "AWS", icon: "logos:aws" },
                },
              },
              {
                id: "cm6rnizak000hic0375jx24q2",
                description: null,
                skillForUser: {
                  id: "cm6aglbk6000dic03py3a1clk",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6ag8yaw001gq7mxqu0mqfvc",
                    name: "Amazon CloudFront",
                    icon: "logos:aws-cloudfront",
                  },
                },
              },
            ],
          },
          {
            id: "cm6g5r02d0001jy032qawarsg",
            name: "Improved team code review and development practices.",
            description:
              '<p dir="ltr"><span style="white-space: pre-wrap;">When I first joined TRD, I quickly noticed that there was a lack of automated code quality checks in the repositories I worked in.</span></p><p dir="ltr"><span style="white-space: pre-wrap;">I made it a priority to ensure that the team learned how important and helpful it is to automate things such as formatting, linting, and testing.</span></p><p dir="ltr"><span style="white-space: pre-wrap;">These practices were adopted org-wide, and led to a more robust and safe development environment, with safer and more streamlined deployment processes.</span></p>',
            sortIndex: 8,
            skillsForProject: [
              {
                id: "cm6g6y9pl0009jj033tjrzcf5",
                description:
                  '<p dir="ltr"><span style="white-space: pre-wrap;">I initiated the effort to utilize VS Code Dev Containers throughout the TRD organization.</span></p>',
                skillForUser: {
                  id: "cm6agiumt0005ic033f6jljig",
                  icon: "devicon:vscode",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agf73a001yq7mx0fbk48nt",
                    name: "VS Code Dev Containers",
                    icon: "devicon:vscode",
                  },
                },
              },
              {
                id: "cm6g6z5l3000fjj035p1e9blc",
                description:
                  '<p dir="ltr"><span style="white-space: pre-wrap;">While I worked with the team at TRD, I helped ensure that we were using Docker effectively, enabling portable development environments and easier onboarding.</span></p>',
                skillForUser: {
                  id: "cm6aelain0009l103k2hc5ocu",
                  icon: "logos:docker-icon",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6681z2o01uhq8n1k0kot5qo", name: "Docker", icon: "" },
                },
              },
              {
                id: "cm6g6ygzp000bjj030w394lo1",
                description: null,
                skillForUser: {
                  id: "cm6agkjoo0007k3038xgcosp2",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agdlhe001tq7mxg28w8h00",
                    name: "pytest",
                    icon: "file-icons:pytest",
                  },
                },
              },
              {
                id: "cm6g6ymbm000djj03n5roanxa",
                description: null,
                skillForUser: {
                  id: "cm6agjz240009ic03m3ya5kbu",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agdb9y001qq7mxei5euqzu",
                    name: "PHPUnit",
                    icon: "devicon:php",
                  },
                },
              },
              {
                id: "cm6rmf2jf0001l5031s75p5s1",
                description:
                  '<p dir="ltr"><span style="white-space: pre-wrap;">Early in my tenure with TRD, I noticed a stark lack of communication between developers. There would be PRs opened up with no descriptions, nondescript titles, no labels.</span></p><p dir="ltr"><span style="white-space: pre-wrap;">With some helpful feedback and leading by example, I believe my influence helped to improve internal code review and documentation standards.</span></p>',
                skillForUser: {
                  id: "cm6rmdb110003ju03xhelcmrz",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm66858vt02n7q8n140fodw5q",
                    name: "GitHub",
                    icon: "mdi:github",
                  },
                },
              },
            ],
          },
          {
            id: "cm6g5dcqw0001lb03rtqwrf2u",
            name: "Solved caching challenges to reduce infrastructure costs.",
            description:
              '<h4 dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">Cache Invalidation</span></h4><p dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">The front-end Next.js setup is served behind CloudFront, so we had to implement robust caching and invalidation settings at multiple levels: Redis Object Cache, Next.js SSR, and CloudFront CDN.</span></p><p dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">We needed to maintain a balance of aggressive caching to save on AWS resources, while ensuring that the latest content was always available to visitors. To accomplish this, I led the effort to plan ideal cache settings for different sections of the website, as well as to architect a plan to trigger a cache-clearing mechanism to keep all content up-to-date when a post is edited in the back-end.</span></p><p dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">You can read more about this challenge&nbsp;</span><a href="https://www.missionmike.dev/blog/javascript/headless-nextjs-kubernetes-cache-busting" target="_blank" rel="noopener noreferrer" class="editorLink"><span style="white-space: pre-wrap;">on my blog here.</span></a></p><h4 dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">Image Assets and CloudFront Costs</span></h4><p dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">The news website&nbsp;</span><a href="https://therealdeal.com/" target="_blank" rel="noopener noreferrer" class="editorLink"><span style="white-space: pre-wrap;">https://therealdeal.com/</span></a><span style="white-space: pre-wrap;">&nbsp;houses hundreds of thousands of images, with several sizes for each image - millions of image assets. The cost of serving these images from the CloudFront CDN via AWS was very high, especially when certain articles would gain traction and go viral.</span></p><p dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">To remedy this, I proposed we serve image assets from a separate static domain, using Cloudflare\'s lower-cost CDN services to serve the image assets. This offloading of images saved thousands of dollars in monthly overhead.</span></p>',
            sortIndex: 9,
            skillsForProject: [
              {
                id: "cm6g6vsos0001jj03fwiu9al5",
                description: null,
                skillForUser: {
                  id: "cm6aes52y0009i503ljxfjqbq",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6688dzj03ekq8n1sszbthoy",
                    name: "Kubernetes",
                    icon: "devicon:kubernetes",
                  },
                },
              },
              {
                id: "cm6g6wxds0005jj0384i678rr",
                description: null,
                skillForUser: {
                  id: "cm6agilnh0003ic03acc7mkkv",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agcw2b001pq7mx2nf6maa4",
                    name: "Next.js",
                    icon: "akar-icons:nextjs-fill",
                  },
                },
              },
              {
                id: "cm6g6vywc0003jj03qpt41wmx",
                description:
                  '<p dir="ltr"><span style="white-space: pre-wrap;">While working on the TRD News website, the team faced some specific caching challenges between WordPress, Next.js, Kubernetes and CloudFront.</span></p><p dir="ltr"><span style="white-space: pre-wrap;">Read more in-depth here: </span><a href="https://www.missionmike.dev/blog/javascript/headless-nextjs-kubernetes-cache-busting" class="editorLink"><span style="white-space: pre-wrap;">https://www.missionmike.dev/blog/javascript/headless-nextjs-kubernetes-cache-busting</span></a></p>',
                skillForUser: {
                  id: "cm6aglbk6000dic03py3a1clk",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6ag8yaw001gq7mxqu0mqfvc",
                    name: "Amazon CloudFront",
                    icon: "logos:aws-cloudfront",
                  },
                },
              },
            ],
          },
          {
            id: "cm6g5rf6t0003l703wyn01txp",
            name: "Configured VS Code Dev Containers for front-end, back-end, and data teams.",
            description:
              '<p dir="ltr"><span style="white-space: pre-wrap;">TRD News and TRD Pro were headless WordPress installations with several services.</span></p><p dir="ltr"><span style="white-space: pre-wrap;">The back-end includes:</span></p><ul><li value="1"><span style="white-space: pre-wrap;">MySQL</span></li><li value="2"><span style="white-space: pre-wrap;">PHP with linting, formatting and testing.</span></li><li value="3"><span style="white-space: pre-wrap;">PostgreSQL for additional data stores.</span></li><li value="4"><span style="white-space: pre-wrap;">Redis for object caching.</span></li><li value="5"><span style="white-space: pre-wrap;">Kubectl sidecar to simulate Kubernetes integration.</span></li></ul><p dir="ltr"><span style="white-space: pre-wrap;">The front-end includes:</span></p><ul><li value="1"><span style="white-space: pre-wrap;">Next.js with TypeScript + React</span></li><li value="2"><span style="white-space: pre-wrap;">Jest, ESLint, Prettier</span></li></ul><p dir="ltr"><span style="white-space: pre-wrap;">These services needed to be spun up and coexisting within local development environments in order for the team to effectively develop in a realistic setting. These complex setups were accomplished via VS Code Dev Containers, using docker-in-docker to orchestrate the services.</span></p><p dir="ltr"><span style="white-space: pre-wrap;">The TRD Data platforms used an even larger set of services, with some unique challenges:</span></p><ul><li value="1"><span style="white-space: pre-wrap;">PostgreSQL for data storage, including a pre-seeded consistent local database.</span></li><li value="2"><span style="white-space: pre-wrap;">Airflow with pre-seeded connections and variables.</span></li><li value="3"><span style="white-space: pre-wrap;">Python with Black Formatter, Pylint, and Pytest.</span></li></ul><p dir="ltr"><span style="white-space: pre-wrap;">In addition to using VS Code Dev Containers, we ensured that every collection of services was easy to spin up, and could be spun up within the context of a GitHub Actions workflow, in order to automate our CI processes in GitHub as easily as we could locally.</span></p>',
            sortIndex: 10,
            skillsForProject: [
              {
                id: "cm6rmitzb0003l5036qci8lac",
                description: null,
                skillForUser: {
                  id: "cm6aelain0009l103k2hc5ocu",
                  icon: "logos:docker-icon",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6681z2o01uhq8n1k0kot5qo", name: "Docker", icon: "" },
                },
              },
              {
                id: "cm6rmj5cy0005l503bfx56g93",
                description: null,
                skillForUser: {
                  id: "cm6agiumt0005ic033f6jljig",
                  icon: "devicon:vscode",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agf73a001yq7mx0fbk48nt",
                    name: "VS Code Dev Containers",
                    icon: "devicon:vscode",
                  },
                },
              },
              {
                id: "cm6rmjc6l0007l503vgdatr1i",
                description: null,
                skillForUser: {
                  id: "cm6aeup79000dl103zf0oj42y",
                  icon: "skill-icons:selenium",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm668h9go05k2q8n19pcwmm6o", name: "Selenium", icon: "" },
                },
              },
              {
                id: "cm6rmjggv0009l503n772in4j",
                description: null,
                skillForUser: {
                  id: "cm68k4bma0005kv03eu4be4up",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668m40g06qgq8n10imipy0c",
                    name: "WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
              {
                id: "cm6rmjqrw000bl5037zurl7fe",
                description: null,
                skillForUser: {
                  id: "cm6aesitq000bi5034zviu73e",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667w3ik00fdq8n1vp4tvphz",
                    name: "Apache Airflow",
                    icon: "logos:airflow-icon",
                  },
                },
              },
              {
                id: "cm6rmk84p000dl503cqsk581j",
                description: null,
                skillForUser: {
                  id: "cm6agkyu9000bic03lfo1zb1j",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668e6mc04t1q8n12dwno2rt",
                    name: "PostgreSQL",
                    icon: "devicon:postgresql",
                  },
                },
              },
              {
                id: "cm6rmksuj000fl503vxxa400w",
                description: null,
                skillForUser: {
                  id: "cm6aeas150007l103xge5wdrv",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm69242wc0013q0oh3j8ksjh1",
                    name: "Headless WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
            ],
          },
          {
            id: "cm6g5rkwh0001l103znz5apk3",
            name: "Designed and developed a proprietary address matching and geocoding solution.",
            description:
              '<p dir="ltr"><span style="white-space: pre-wrap;">What good is an address if it\'s not accurate?</span></p><p dir="ltr"><span style="white-space: pre-wrap;">This was a problem we faced at TRD. It was simple enough to acquire the address as represented by a website or service where the data was sourced. However, we discovered that the source wasn\'t always accurate - there\'d be a misspelling, or invalid street number variation.</span></p><p dir="ltr"><span style="white-space: pre-wrap;">To combat this, we set out to build a proprietary address matching system with geocoding solution.</span></p><p dir="ltr"><span style="white-space: pre-wrap;">First, we decided on the spec, and an acceptable level of accuracy.</span></p><p dir="ltr"><span style="white-space: pre-wrap;">Then, we put our heads together to plan the process and scaffold a concept.</span></p><p dir="ltr"><span style="white-space: pre-wrap;">From there, I worked to implement the code and logic, relying on Google Maps API as a source of truth for formatted addresses and geolocation data.</span></p>',
            sortIndex: 11,
            skillsForProject: [
              {
                id: "cm6rn4gko0001jl03lb2nx5uv",
                description: null,
                skillForUser: {
                  id: "cm6aeaekw0001i503avpsv283",
                  icon: "mynaui:api-solid",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm691zuep0010q0ohjkqrs49c",
                    name: "API Development",
                    icon: "mynaui:api-solid",
                  },
                },
              },
              {
                id: "cm6rn4ugg0003jl03kpgeh1eo",
                description: null,
                skillForUser: {
                  id: "cm6agkyu9000bic03lfo1zb1j",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668e6mc04t1q8n12dwno2rt",
                    name: "PostgreSQL",
                    icon: "devicon:postgresql",
                  },
                },
              },
              {
                id: "cm6rn56rq0005jl03mlrwcnxw",
                description: null,
                skillForUser: {
                  id: "cm6aesitq000bi5034zviu73e",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667w3ik00fdq8n1vp4tvphz",
                    name: "Apache Airflow",
                    icon: "logos:airflow-icon",
                  },
                },
              },
              {
                id: "cm6rn5bo40007jl03rehns498",
                description: null,
                skillForUser: {
                  id: "cm6aep9bf0007i503albfvbsq",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668eyaj04zsq8n1ncmo4s05",
                    name: "Python",
                    icon: "devicon:python",
                  },
                },
              },
              {
                id: "cm6rn5nu20009jl03dpoms8e1",
                description: null,
                skillForUser: {
                  id: "cm6aesp39000di503vgtn4a4t",
                  icon: "",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6684b9b02f0q8n1e0dfgj13",
                    name: "Flask",
                    icon: "mdi:flask",
                  },
                },
              },
              {
                id: "cm6rn6f78000bjl032qmxlk1d",
                description: null,
                skillForUser: {
                  id: "cm6agmi7d000jic03iie8m002",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agef91001wq7mx0nz0tswe",
                    name: "SQLAlchemy",
                    icon: "devicon-plain:sqlalchemy",
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cm6agn1ge000lic031ry19fcp",
    name: "Recording Radio Film Connection & CASA Schools",
    location: "Los Angeles, CA (Remote)",
    startDate: "1388620800000",
    endDate: "1643760000000",
    positions: [
      {
        id: "cm6agv4j0000nic03a73weyxo",
        title: "Lead Developer / Designer",
        startDate: "1533002400000",
        endDate: "1646100000000",
        projects: [
          {
            id: "cm6g73il40001jr03x2a8gc9e",
            name: "Designed a system to organize customer reviews for market-specific landing pages.",
            description: "",
            sortIndex: 5,
            skillsForProject: [
              {
                id: "cm6x2osdt000pjo037a63onlc",
                description: null,
                skillForUser: {
                  id: "cm6aeas150007l103xge5wdrv",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm69242wc0013q0oh3j8ksjh1",
                    name: "Headless WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
              {
                id: "cm6x2ovoi000rjo03loio4t02",
                description: null,
                skillForUser: {
                  id: "cm6aeaekw0001i503avpsv283",
                  icon: "mynaui:api-solid",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm691zuep0010q0ohjkqrs49c",
                    name: "API Development",
                    icon: "mynaui:api-solid",
                  },
                },
              },
              {
                id: "cm6x2p52p000tjo037brkz8cf",
                description: null,
                skillForUser: {
                  id: "cm68k3smr0001kv030gg784q2",
                  icon: "devicon:php",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668dt8r04psq8n1sak089qe",
                    name: "PHP",
                    icon: "devicon:php",
                  },
                },
              },
              {
                id: "cm6x2pbxg000vjo033ybyj7tz",
                description: null,
                skillForUser: {
                  id: "cm6rnnyp8000vl703vc4duw4e",
                  icon: "devicon:mariadb-wordmark",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6689m7503p9q8n1o6ppfpaz", name: "MariaDB", icon: "" },
                },
              },
              {
                id: "cm6x2pqm5000xjo03ob4fxm4m",
                description: null,
                skillForUser: {
                  id: "cm675y4tv0005ji032plmzxfa",
                  icon: "logos:javascript",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6687wto03afq8n1r577zy89",
                    name: "JavaScript",
                    icon: "logos:javascript",
                  },
                },
              },
            ],
          },
          {
            id: "cm6x3f1az0001l1032ehosnzg",
            name: "Managed hosting and servers for mini-sites, marketing landing pages, and learning management system.",
            description: null,
            sortIndex: 8,
            skillsForProject: [
              {
                id: "cm6x3f98g0001la0324xoxae3",
                description: null,
                skillForUser: {
                  id: "cm6g6m2vl0003kv03xd2ufh0x",
                  icon: "eos-icons:project-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5kqii001monncks4pvow7",
                    name: "Project Management",
                    icon: "eos-icons:project-outlined",
                  },
                },
              },
              {
                id: "cm6x3fblk0003la03z8u1ufmo",
                description: null,
                skillForUser: {
                  id: "cm68k4vl60009kv033c3deq5b",
                  icon: "ant-design:linux-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6688xv703jdq8n1iy33olzm", name: "Linux", icon: "" },
                },
              },
              {
                id: "cm6x3ffn10005la03xj6s47qc",
                description: null,
                skillForUser: {
                  id: "cm6ae9hck0003l103bsrk9967",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6921t4m0012q0ohy9ur2g0k",
                    name: "cPanel",
                    icon: "logos:cpanel",
                  },
                },
              },
              {
                id: "cm6x3ficz0007la03lskwfyy9",
                description: null,
                skillForUser: {
                  id: "cm6ae9suw0005l103jaky1om0",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm692b7hi0015q0ohdl5i7b26",
                    name: "WHM",
                    icon: "fa-brands:whmcs",
                  },
                },
              },
              {
                id: "cm6x3flj20009la0371tzritb",
                description: null,
                skillForUser: {
                  id: "cm6ae8vdl0001l103evth8305",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm69214450011q0ohs8dfhkto",
                    name: "CentOS",
                    icon: "devicon:centos",
                  },
                },
              },
            ],
          },
          {
            id: "cm6g71ff70001l8039dpbdtqv",
            name: "Mentored junior developers and designers, managed projects and oversaw contract work from vendors.",
            description: null,
            sortIndex: 0,
            skillsForProject: [
              {
                id: "cm6rnkwpa0001l703gt9lx280",
                description: null,
                skillForUser: {
                  id: "cm6rnk5q90001l503icgic0yu",
                  icon: "ic:twotone-people",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5jjmt001lonnchcvtpvor",
                    name: "Mentoring",
                    icon: "ic:twotone-people",
                  },
                },
              },
              {
                id: "cm6rnkzvz0003l7033fdfny47",
                description: null,
                skillForUser: {
                  id: "cm6g6m2vl0003kv03xd2ufh0x",
                  icon: "eos-icons:project-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5kqii001monncks4pvow7",
                    name: "Project Management",
                    icon: "eos-icons:project-outlined",
                  },
                },
              },
            ],
          },
          {
            id: "cm6g71ksv0001la03jql5e3ft",
            name: "Launched a custom learning management system and provided onboarding support and training.",
            description: null,
            sortIndex: 1,
            skillsForProject: [
              {
                id: "cm6rnlc670005l703ska6sns2",
                description: null,
                skillForUser: {
                  id: "cm6aeaekw0001i503avpsv283",
                  icon: "mynaui:api-solid",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm691zuep0010q0ohjkqrs49c",
                    name: "API Development",
                    icon: "mynaui:api-solid",
                  },
                },
              },
              {
                id: "cm6rnljg90007l703vjken7gk",
                description: null,
                skillForUser: {
                  id: "cm675y4tv0005ji032plmzxfa",
                  icon: "logos:javascript",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6687wto03afq8n1r577zy89",
                    name: "JavaScript",
                    icon: "logos:javascript",
                  },
                },
              },
              {
                id: "cm6rnlqpr0009l703093ng41l",
                description: null,
                skillForUser: {
                  id: "cm68k3smr0001kv030gg784q2",
                  icon: "devicon:php",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668dt8r04psq8n1sak089qe",
                    name: "PHP",
                    icon: "devicon:php",
                  },
                },
              },
              {
                id: "cm6rnlut6000bl703jqai5bjo",
                description: null,
                skillForUser: {
                  id: "cm68k4vl60009kv033c3deq5b",
                  icon: "ant-design:linux-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6688xv703jdq8n1iy33olzm", name: "Linux", icon: "" },
                },
              },
              {
                id: "cm6rnlyr1000dl703ylmgd5qh",
                description: null,
                skillForUser: {
                  id: "cm6g6m2vl0003kv03xd2ufh0x",
                  icon: "eos-icons:project-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5kqii001monncks4pvow7",
                    name: "Project Management",
                    icon: "eos-icons:project-outlined",
                  },
                },
              },
              {
                id: "cm6rnm1ea000fl703gkqk8pkj",
                description: null,
                skillForUser: {
                  id: "cm68k4bma0005kv03eu4be4up",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668m40g06qgq8n10imipy0c",
                    name: "WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
              {
                id: "cm6rnm5v4000hl70340rtl32b",
                description: null,
                skillForUser: {
                  id: "cm6rmdhr40005ju03n5g4k6k6",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agb8vp001oq7mxcsj03ztn",
                    name: "GitHub Actions",
                    icon: "mdi:github",
                  },
                },
              },
              {
                id: "cm6rnmdf1000jl703py4c713r",
                description: null,
                skillForUser: {
                  id: "cm6ae9hck0003l103bsrk9967",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6921t4m0012q0ohy9ur2g0k",
                    name: "cPanel",
                    icon: "logos:cpanel",
                  },
                },
              },
              {
                id: "cm6rnmfzv000ll703rbgxxo4e",
                description: null,
                skillForUser: {
                  id: "cm6ae9suw0005l103jaky1om0",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm692b7hi0015q0ohdl5i7b26",
                    name: "WHM",
                    icon: "fa-brands:whmcs",
                  },
                },
              },
              {
                id: "cm6rnmjzq000nl7032sbir98w",
                description: null,
                skillForUser: {
                  id: "cm6aen3q20005i5035y0svuqn",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668giha05dhq8n1nmdqusko",
                    name: "Salesforce.com Salesforce CRM",
                    icon: "devicon:salesforce",
                  },
                },
              },
              {
                id: "cm6rnmzqy000pl703zkfqkj32",
                description: null,
                skillForUser: {
                  id: "cm6ae8vdl0001l103evth8305",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm69214450011q0ohs8dfhkto",
                    name: "CentOS",
                    icon: "devicon:centos",
                  },
                },
              },
              {
                id: "cm6rnncms000rl703729eilku",
                description: null,
                skillForUser: {
                  id: "cm675xsjx0001ji03q9k6t92e",
                  icon: "logos:css-3",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667yv0w013fq8n1tj18q87p",
                    name: "CSS",
                    icon: "logos:css-3",
                  },
                },
              },
              {
                id: "cm6rnnf0e000tl703y2q08ojm",
                description: null,
                skillForUser: {
                  id: "cm675xz120003ji03uuafmslg",
                  icon: "logos:html-5",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6686bci02wkq8n1hqnzu16w",
                    name: "HTML",
                    icon: "logos:html-5",
                  },
                },
              },
            ],
          },
          {
            id: "cm6g71pqg0001jo03sem155xd",
            name: "Coordinated org-wide Salesforce and Pardot upgrades and training in partnership with a contractor.",
            description: null,
            sortIndex: 2,
            skillsForProject: [
              {
                id: "cm6x2l3pg0001jo03qmrof6e0",
                description: null,
                skillForUser: {
                  id: "cm6aen3q20005i5035y0svuqn",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668giha05dhq8n1nmdqusko",
                    name: "Salesforce.com Salesforce CRM",
                    icon: "devicon:salesforce",
                  },
                },
              },
              {
                id: "cm6x2l8to0003jo036vhk4csu",
                description: null,
                skillForUser: {
                  id: "cm6agkal40005k3034qrxn9ce",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agdzbl001uq7mxoaidvjc4",
                    name: "Salesforce Pardot",
                    icon: "devicon:salesforce",
                  },
                },
              },
              {
                id: "cm6x2lead0005jo03v51mnlb0",
                description: null,
                skillForUser: {
                  id: "cm6g6m2vl0003kv03xd2ufh0x",
                  icon: "eos-icons:project-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5kqii001monncks4pvow7",
                    name: "Project Management",
                    icon: "eos-icons:project-outlined",
                  },
                },
              },
            ],
          },
          {
            id: "cm6g71un20001l803mvwq1qig",
            name: "Developed Salesforce-integrated payment portal with Authorize.net.",
            description: null,
            sortIndex: 3,
            skillsForProject: [
              {
                id: "cm6x2loib0007jo03o4xc7jod",
                description: null,
                skillForUser: {
                  id: "cm6aen3q20005i5035y0svuqn",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668giha05dhq8n1nmdqusko",
                    name: "Salesforce.com Salesforce CRM",
                    icon: "devicon:salesforce",
                  },
                },
              },
              {
                id: "cm6x2mjak0009jo031j700s1y",
                description: null,
                skillForUser: {
                  id: "cm6aeaekw0001i503avpsv283",
                  icon: "mynaui:api-solid",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm691zuep0010q0ohjkqrs49c",
                    name: "API Development",
                    icon: "mynaui:api-solid",
                  },
                },
              },
              {
                id: "cm6x2mos3000bjo03amam480w",
                description: null,
                skillForUser: {
                  id: "cm6g6luqh0001kv039nzygvxl",
                  icon: "ant-design:shopping-twotone",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5heo9001ionncbpfyts0i",
                    name: "eCommerce",
                    icon: "ant-design:shopping-twotone",
                  },
                },
              },
            ],
          },
          {
            id: "cm6g73d4a0001l5036x1p7kpn",
            name: "Designed and built a new marketing website for flagship products using headless WordPress and React.",
            description: null,
            sortIndex: 4,
            skillsForProject: [
              {
                id: "cm6x2n8uj000djo03dngu97pc",
                description: null,
                skillForUser: {
                  id: "cm68k9sa90003l203p8hrdf82",
                  icon: "devicon:photoshop",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v7t0007pq8n11zni5nv8",
                    name: "Adobe Photoshop",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x2noz1000fjo038c4splt2",
                description: null,
                skillForUser: {
                  id: "cm675y4tv0005ji032plmzxfa",
                  icon: "logos:javascript",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6687wto03afq8n1r577zy89",
                    name: "JavaScript",
                    icon: "logos:javascript",
                  },
                },
              },
              {
                id: "cm6x2nrw6000hjo03lcbfomac",
                description: null,
                skillForUser: {
                  id: "cm6rmdhr40005ju03n5g4k6k6",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agb8vp001oq7mxcsj03ztn",
                    name: "GitHub Actions",
                    icon: "mdi:github",
                  },
                },
              },
              {
                id: "cm6x2o2ca000jjo03tbx3lshn",
                description: null,
                skillForUser: {
                  id: "cm6agjsqn0007ic030qhl4gj2",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agb4cr001nq7mxmgx7xf7q",
                    name: "GatsbyJS",
                    icon: "mdi:gatsby",
                  },
                },
              },
              {
                id: "cm6x2ocp2000ljo03z9uxy2xs",
                description: null,
                skillForUser: {
                  id: "cm68kb7x8000bl2037gmen2qz",
                  icon: "devicon:react",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668feg1053qq8n19cooz2k5",
                    name: "React",
                    icon: "devicon:react",
                  },
                },
              },
              {
                id: "cm6x2oiur000njo03yuuuo8nv",
                description: null,
                skillForUser: {
                  id: "cm6aeas150007l103xge5wdrv",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm69242wc0013q0oh3j8ksjh1",
                    name: "Headless WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
            ],
          },
          {
            id: "cm6hidik60001l70375gig2j7",
            name: "Designed a geo-targeted tier system to optimize the sales funnel in Salesforce.",
            description: "",
            sortIndex: 6,
            skillsForProject: [
              {
                id: "cm6x2qquc000zjo03widu6azy",
                description: null,
                skillForUser: {
                  id: "cm6aen3q20005i5035y0svuqn",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668giha05dhq8n1nmdqusko",
                    name: "Salesforce.com Salesforce CRM",
                    icon: "devicon:salesforce",
                  },
                },
              },
            ],
          },
          {
            id: "cm6hidnqk0001l103pzy84p1g",
            name: "Implemented automated testing with Jest and React, and continuous integration with GitHub Actions.",
            description: "",
            sortIndex: 7,
            skillsForProject: [
              {
                id: "cm6x2s6np0001l503uim3tqcb",
                description: null,
                skillForUser: {
                  id: "cm6g6zqgj000hjj03iselntqt",
                  icon: "skill-icons:jest",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5ix76001konncu0fo496o",
                    name: "Jest",
                    icon: "skill-icons:jest",
                  },
                },
              },
              {
                id: "cm6x2sbn70003l5033gvtjjlu",
                description: null,
                skillForUser: {
                  id: "cm68kd7lw000bkv03qpk28id3",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668kox906e0q8n1rc6zxge6",
                    name: "TypeScript",
                    icon: "devicon:typescript",
                  },
                },
              },
              {
                id: "cm6x2se280005l503dqyr9noz",
                description: null,
                skillForUser: {
                  id: "cm6rmdhr40005ju03n5g4k6k6",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agb8vp001oq7mxcsj03ztn",
                    name: "GitHub Actions",
                    icon: "mdi:github",
                  },
                },
              },
              {
                id: "cm6x2sj1s0007l5033xezr38n",
                description: null,
                skillForUser: {
                  id: "cm68kb7x8000bl2037gmen2qz",
                  icon: "devicon:react",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668feg1053qq8n19cooz2k5",
                    name: "React",
                    icon: "devicon:react",
                  },
                },
              },
              {
                id: "cm6x2ssn60009l503ywgw7xxw",
                description: null,
                skillForUser: {
                  id: "cm6agj8gu0003k303m4udsp9i",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6aga821001mq7mxfqon670c",
                    name: "Cypress",
                    icon: "catppuccin:cypress",
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "cm6agup8j000dk303ak0komm8",
        title: "Web Developer / Designer",
        startDate: "1454292000000",
        endDate: "1533002400000",
        projects: [
          {
            id: "cm6hie39e0001if03h0q90ud7",
            name: "Improved website performance and SEO in partnership with contractors.",
            description: null,
            sortIndex: 1,
            skillsForProject: [
              {
                id: "cm6x302sa0001l503mh5yu3zm",
                description: null,
                skillForUser: {
                  id: "cm6x2zmju0003lb034a1xqc7p",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5lfyl001nonncvw3425t6",
                    name: "Search Engine Optimization (SEO)",
                    icon: "ri:seo-line",
                  },
                },
              },
            ],
          },
          {
            id: "cm6hieh790001jy03ym4breb6",
            name: "Developed internal APIs to publish content across multiple sites faster.",
            description: null,
            sortIndex: 2,
            skillsForProject: [
              {
                id: "cm6x30ezo0003l503d05hpaj0",
                description: null,
                skillForUser: {
                  id: "cm68k4bma0005kv03eu4be4up",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668m40g06qgq8n10imipy0c",
                    name: "WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
              {
                id: "cm6x30mdm0005l503h4d9qlis",
                description: null,
                skillForUser: {
                  id: "cm6aeaekw0001i503avpsv283",
                  icon: "mynaui:api-solid",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm691zuep0010q0ohjkqrs49c",
                    name: "API Development",
                    icon: "mynaui:api-solid",
                  },
                },
              },
            ],
          },
          {
            id: "cm6hif2fj0001la0305qz1rx2",
            name: "Managed email and web newsletter for 100K+ recipients.",
            description: null,
            sortIndex: 5,
            skillsForProject: [
              {
                id: "cm6x35eyu0007lb03by6z63a1",
                description: null,
                skillForUser: {
                  id: "cm6agkal40005k3034qrxn9ce",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agdzbl001uq7mxoaidvjc4",
                    name: "Salesforce Pardot",
                    icon: "devicon:salesforce",
                  },
                },
              },
              {
                id: "cm6x3571l0005lb03sllpjlwx",
                description: null,
                skillForUser: {
                  id: "cm6x34hvy000ll503v8ec20ei",
                  icon: "logos:mailchimp-freddie",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6689e0y03naq8n1353td21l", name: "MailChimp", icon: "" },
                },
              },
            ],
          },
          {
            id: "cm6hidwxp0001i903tashrd9p",
            name: "Designed and developed a custom learning management system for hybrid learning.",
            description: null,
            sortIndex: 0,
            skillsForProject: [
              {
                id: "cm6x2v7q90003l503mnya7nfr",
                description: null,
                skillForUser: {
                  id: "cm68k4bma0005kv03eu4be4up",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668m40g06qgq8n10imipy0c",
                    name: "WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
              {
                id: "cm6x2v9zp0005l503p1ubafoc",
                description: null,
                skillForUser: {
                  id: "cm6g6m2vl0003kv03xd2ufh0x",
                  icon: "eos-icons:project-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5kqii001monncks4pvow7",
                    name: "Project Management",
                    icon: "eos-icons:project-outlined",
                  },
                },
              },
              {
                id: "cm6x2vgsp0007l503oj0drtx2",
                description: null,
                skillForUser: {
                  id: "cm6rmdhr40005ju03n5g4k6k6",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agb8vp001oq7mxcsj03ztn",
                    name: "GitHub Actions",
                    icon: "mdi:github",
                  },
                },
              },
              {
                id: "cm6x2vss00009l503p1mlgaxi",
                description: null,
                skillForUser: {
                  id: "cm68k3smr0001kv030gg784q2",
                  icon: "devicon:php",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668dt8r04psq8n1sak089qe",
                    name: "PHP",
                    icon: "devicon:php",
                  },
                },
              },
              {
                id: "cm6x2vxn8000bl503h4xm49d4",
                description: null,
                skillForUser: {
                  id: "cm675y4tv0005ji032plmzxfa",
                  icon: "logos:javascript",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6687wto03afq8n1r577zy89",
                    name: "JavaScript",
                    icon: "logos:javascript",
                  },
                },
              },
              {
                id: "cm6x2w5i3000dl503xwtmay8u",
                description: null,
                skillForUser: {
                  id: "cm6aeaekw0001i503avpsv283",
                  icon: "mynaui:api-solid",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm691zuep0010q0ohjkqrs49c",
                    name: "API Development",
                    icon: "mynaui:api-solid",
                  },
                },
              },
              {
                id: "cm6x2w9zc000fl503ckpmnfmi",
                description: null,
                skillForUser: {
                  id: "cm6rnnyp8000vl703vc4duw4e",
                  icon: "devicon:mariadb-wordmark",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6689m7503p9q8n1o6ppfpaz", name: "MariaDB", icon: "" },
                },
              },
              {
                id: "cm6x2wgog000hl5031axbzddi",
                description: null,
                skillForUser: {
                  id: "cm6aen3q20005i5035y0svuqn",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668giha05dhq8n1nmdqusko",
                    name: "Salesforce.com Salesforce CRM",
                    icon: "devicon:salesforce",
                  },
                },
              },
            ],
          },
          {
            id: "cm6hiepeo0001lb03qd69wekt",
            name: "Designed and built landing pages, multi-step forms and surveys.",
            description: null,
            sortIndex: 3,
            skillsForProject: [
              {
                id: "cm6x30tji0007l5035w63rxvw",
                description: null,
                skillForUser: {
                  id: "cm675y4tv0005ji032plmzxfa",
                  icon: "logos:javascript",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6687wto03afq8n1r577zy89",
                    name: "JavaScript",
                    icon: "logos:javascript",
                  },
                },
              },
              {
                id: "cm6x30x2c0009l503of5zgr7b",
                description: null,
                skillForUser: {
                  id: "cm6aeaekw0001i503avpsv283",
                  icon: "mynaui:api-solid",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm691zuep0010q0ohjkqrs49c",
                    name: "API Development",
                    icon: "mynaui:api-solid",
                  },
                },
              },
              {
                id: "cm6x31d9d000bl503sw49uz70",
                description: null,
                skillForUser: {
                  id: "cm6agkal40005k3034qrxn9ce",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6agdzbl001uq7mxoaidvjc4",
                    name: "Salesforce Pardot",
                    icon: "devicon:salesforce",
                  },
                },
              },
              {
                id: "cm6x31pqr000dl503sz0qhj92",
                description: null,
                skillForUser: {
                  id: "cm675xz120003ji03uuafmslg",
                  icon: "logos:html-5",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6686bci02wkq8n1hqnzu16w",
                    name: "HTML",
                    icon: "logos:html-5",
                  },
                },
              },
              {
                id: "cm6x31zvb000fl503xdv4hg0p",
                description: null,
                skillForUser: {
                  id: "cm68k3smr0001kv030gg784q2",
                  icon: "devicon:php",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668dt8r04psq8n1sak089qe",
                    name: "PHP",
                    icon: "devicon:php",
                  },
                },
              },
            ],
          },
          {
            id: "cm6hieurv0001l8033iuhfhm7",
            name: "Implemented version control for all projects with GitHub.",
            description: null,
            sortIndex: 4,
            skillsForProject: [
              {
                id: "cm6x325yz000hl503igw5i1vm",
                description: null,
                skillForUser: {
                  id: "cm6rmdb110003ju03xhelcmrz",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm66858vt02n7q8n140fodw5q",
                    name: "GitHub",
                    icon: "mdi:github",
                  },
                },
              },
              {
                id: "cm6x329th000jl5039gxlnqcs",
                description: null,
                skillForUser: {
                  id: "cm6g6m2vl0003kv03xd2ufh0x",
                  icon: "eos-icons:project-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5kqii001monncks4pvow7",
                    name: "Project Management",
                    icon: "eos-icons:project-outlined",
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "cm6ago32l0001js03gymlwj4x",
        title: "Junior Graphic Designer",
        startDate: "1391220000000",
        endDate: "1454292000000",
        projects: [
          {
            id: "cm6agp15y0005js0391v6pzhl",
            name: "Developed custom interactive curriculum exercises.",
            description: null,
            sortIndex: 2,
            skillsForProject: [
              {
                id: "cm6x3bvgr000ll503snzfx36p",
                description: null,
                skillForUser: {
                  id: "cm675xz120003ji03uuafmslg",
                  icon: "logos:html-5",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6686bci02wkq8n1hqnzu16w",
                    name: "HTML",
                    icon: "logos:html-5",
                  },
                },
              },
              {
                id: "cm6x3c1e4000nl503ji6cvkkd",
                description: null,
                skillForUser: {
                  id: "cm675xsjx0001ji03q9k6t92e",
                  icon: "logos:css-3",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667yv0w013fq8n1tj18q87p",
                    name: "CSS",
                    icon: "logos:css-3",
                  },
                },
              },
              {
                id: "cm6x3c3yn000pl5030c03kjuy",
                description: null,
                skillForUser: {
                  id: "cm675y4tv0005ji032plmzxfa",
                  icon: "logos:javascript",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6687wto03afq8n1r577zy89",
                    name: "JavaScript",
                    icon: "logos:javascript",
                  },
                },
              },
              {
                id: "cm6x3chk3000tl50371wxkt7n",
                description: null,
                skillForUser: {
                  id: "cm68k9sa90003l203p8hrdf82",
                  icon: "devicon:photoshop",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v7t0007pq8n11zni5nv8",
                    name: "Adobe Photoshop",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3cjq9000vl5033idw8fdn",
                description: null,
                skillForUser: {
                  id: "cm68ka3640005l203n9nd19am",
                  icon: "skill-icons:illustrator",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v6j4007eq8n1fx0rztpl",
                    name: "Adobe Illustrator",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3cpn6000xl503mc3d25kv",
                description: null,
                skillForUser: {
                  id: "cm6x39boe0001l103opy5mhza",
                  icon: "catppuccin:adobe-id",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v6vp007hq8n1ew51c3ld",
                    name: "Adobe InDesign",
                    icon: "",
                  },
                },
              },
            ],
          },
          {
            id: "cm6agp6p20001le034tt179tv",
            name: "Designed ad campaigns, creative templates, email blasts and print banners.",
            description: null,
            sortIndex: 3,
            skillsForProject: [
              {
                id: "cm6x3cus6000zl503gv84skd2",
                description: null,
                skillForUser: {
                  id: "cm68k9sa90003l203p8hrdf82",
                  icon: "devicon:photoshop",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v7t0007pq8n11zni5nv8",
                    name: "Adobe Photoshop",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3cwxs0011l5031wn12elz",
                description: null,
                skillForUser: {
                  id: "cm68ka3640005l203n9nd19am",
                  icon: "skill-icons:illustrator",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v6j4007eq8n1fx0rztpl",
                    name: "Adobe Illustrator",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3d0jw0013l503b2elk9ev",
                description: null,
                skillForUser: {
                  id: "cm6x39boe0001l103opy5mhza",
                  icon: "catppuccin:adobe-id",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v6vp007hq8n1ew51c3ld",
                    name: "Adobe InDesign",
                    icon: "",
                  },
                },
              },
            ],
          },
          {
            id: "cm6agog20000bk303pc2u1oll",
            name: "Designed and developed marketing and blog websites.",
            description:
              '<p dir="ltr"><span style="white-space: pre-wrap;">I was responsible for designing and maintaining several landing pages and marketing websites for the Recording Connection.</span></p>',
            sortIndex: 0,
            skillsForProject: [
              {
                id: "cm6agqgw20001l503hrcmq5cp",
                description: null,
                skillForUser: {
                  id: "cm675xz120003ji03uuafmslg",
                  icon: "logos:html-5",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6686bci02wkq8n1hqnzu16w",
                    name: "HTML",
                    icon: "logos:html-5",
                  },
                },
              },
              {
                id: "cm6agqjsn0003l5032jy96bn0",
                description: null,
                skillForUser: {
                  id: "cm675xsjx0001ji03q9k6t92e",
                  icon: "logos:css-3",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667yv0w013fq8n1tj18q87p",
                    name: "CSS",
                    icon: "logos:css-3",
                  },
                },
              },
              {
                id: "cm6agqmji0005l503fdlqw5e5",
                description: null,
                skillForUser: {
                  id: "cm675y4tv0005ji032plmzxfa",
                  icon: "logos:javascript",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6687wto03afq8n1r577zy89",
                    name: "JavaScript",
                    icon: "logos:javascript",
                  },
                },
              },
              {
                id: "cm6agqqov0007l503vlxbpsz6",
                description: null,
                skillForUser: {
                  id: "cm68k3smr0001kv030gg784q2",
                  icon: "devicon:php",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668dt8r04psq8n1sak089qe",
                    name: "PHP",
                    icon: "devicon:php",
                  },
                },
              },
              {
                id: "cm6agqsxj0009l503ji7tlzei",
                description: null,
                skillForUser: {
                  id: "cm68k4bma0005kv03eu4be4up",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668m40g06qgq8n10imipy0c",
                    name: "WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
            ],
          },
          {
            id: "cm6agotkg0003js03tqu1jbfu",
            name: "Designed school curriculum and marketing graphics.",
            description: null,
            sortIndex: 1,
            skillsForProject: [
              {
                id: "cm6x3azyk000bl5033r2q4qm2",
                description: null,
                skillForUser: {
                  id: "cm68k9sa90003l203p8hrdf82",
                  icon: "devicon:photoshop",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v7t0007pq8n11zni5nv8",
                    name: "Adobe Photoshop",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3b50n000fl503teef6rfe",
                description: null,
                skillForUser: {
                  id: "cm6x39boe0001l103opy5mhza",
                  icon: "catppuccin:adobe-id",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v6vp007hq8n1ew51c3ld",
                    name: "Adobe InDesign",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3b7jm000hl50382sxfpvg",
                description: null,
                skillForUser: {
                  id: "cm68ka3640005l203n9nd19am",
                  icon: "skill-icons:illustrator",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v6j4007eq8n1fx0rztpl",
                    name: "Adobe Illustrator",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3bc2p000jl503xaa5ua4i",
                description: null,
                skillForUser: {
                  id: "cm68kahzw0007l203lsna4qlf",
                  icon: "skill-icons:premiere",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v85b007sq8n16aih8t2o",
                    name: "Adobe Premiere Pro",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3ca5u000rl5033tzymp4w",
                description: null,
                skillForUser: {
                  id: "cm68kayoa0009l203ivupoihf",
                  icon: "logos:adobe-after-effects",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v4bx006vq8n1142vedil",
                    name: "Adobe After Effects",
                    icon: "",
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cm6agvy4d0001ju038t8a26c9",
    name: "Urban Farm Agency / itBrand.co",
    location: "Long Beach, CA (Remote)",
    startDate: "1464825600000",
    endDate: "1530489600000",
    positions: [
      {
        id: "cm6agwykl000pic03cixbq4k8",
        title: "Senior Web Developer, Contract",
        startDate: "1498874400000",
        endDate: "1533002400000",
        projects: [
          {
            id: "cm6jvpd4v0001l203tdk4shim",
            name: "Mentored and worked with other designers and developers to ship projects for a variety of verticals.",
            description: null,
            sortIndex: 0,
            skillsForProject: [
              {
                id: "cm6x3fzxf0005l103vkdu8fjp",
                description: null,
                skillForUser: {
                  id: "cm6rnk5q90001l503icgic0yu",
                  icon: "ic:twotone-people",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5jjmt001lonnchcvtpvor",
                    name: "Mentoring",
                    icon: "ic:twotone-people",
                  },
                },
              },
              {
                id: "cm6x3g3rs0007l1033lus1oal",
                description: null,
                skillForUser: {
                  id: "cm68k4bma0005kv03eu4be4up",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668m40g06qgq8n10imipy0c",
                    name: "WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
              {
                id: "cm6x3gb4u0009l103g9a7fxd1",
                description: null,
                skillForUser: {
                  id: "cm6g6m2vl0003kv03xd2ufh0x",
                  icon: "eos-icons:project-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5kqii001monncks4pvow7",
                    name: "Project Management",
                    icon: "eos-icons:project-outlined",
                  },
                },
              },
              {
                id: "cm6x3hip4000jl103w0lpxxzv",
                description: null,
                skillForUser: {
                  id: "cm68k4vl60009kv033c3deq5b",
                  icon: "ant-design:linux-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: { id: "cm6688xv703jdq8n1iy33olzm", name: "Linux", icon: "" },
                },
              },
              {
                id: "cm6x3hpad000ll103mqe27brh",
                description: null,
                skillForUser: {
                  id: "cm68k3smr0001kv030gg784q2",
                  icon: "devicon:php",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668dt8r04psq8n1sak089qe",
                    name: "PHP",
                    icon: "devicon:php",
                  },
                },
              },
              {
                id: "cm6x3hxh9000nl103w3c3zsqe",
                description: null,
                skillForUser: {
                  id: "cm675y4tv0005ji032plmzxfa",
                  icon: "logos:javascript",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6687wto03afq8n1r577zy89",
                    name: "JavaScript",
                    icon: "logos:javascript",
                  },
                },
              },
              {
                id: "cm6x3i3y6000pl103btaxa1db",
                description: null,
                skillForUser: {
                  id: "cm68k3zp80003kv03v6yxmr4n",
                  icon: "skill-icons:mysql-light",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668bkqu046cq8n1qt6z80w0",
                    name: "MySQL",
                    icon: "logos:mysql-icon",
                  },
                },
              },
              {
                id: "cm6x3i7lu000rl103m640t9fv",
                description: null,
                skillForUser: {
                  id: "cm675xz120003ji03uuafmslg",
                  icon: "logos:html-5",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6686bci02wkq8n1hqnzu16w",
                    name: "HTML",
                    icon: "logos:html-5",
                  },
                },
              },
              {
                id: "cm6x3ibup000tl103rhcamwq1",
                description: null,
                skillForUser: {
                  id: "cm675xsjx0001ji03q9k6t92e",
                  icon: "logos:css-3",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667yv0w013fq8n1tj18q87p",
                    name: "CSS",
                    icon: "logos:css-3",
                  },
                },
              },
            ],
          },
          {
            id: "cm6jvpo4w0001l703eh1wnda0",
            name: "Designed and built websites and web applications for clients in WordPress.",
            description: null,
            sortIndex: 2,
            skillsForProject: [
              {
                id: "cm6x3ikij000vl103n7tupfu3",
                description: null,
                skillForUser: {
                  id: "cm68k9sa90003l203p8hrdf82",
                  icon: "devicon:photoshop",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v7t0007pq8n11zni5nv8",
                    name: "Adobe Photoshop",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3inbj000xl1032h4smw6v",
                description: null,
                skillForUser: {
                  id: "cm68ka3640005l203n9nd19am",
                  icon: "skill-icons:illustrator",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v6j4007eq8n1fx0rztpl",
                    name: "Adobe Illustrator",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3iq3b000zl103g9sva5a6",
                description: null,
                skillForUser: {
                  id: "cm68k4bma0005kv03eu4be4up",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668m40g06qgq8n10imipy0c",
                    name: "WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
              {
                id: "cm6x3iv660011l1035ztxrfuq",
                description: null,
                skillForUser: {
                  id: "cm675xz120003ji03uuafmslg",
                  icon: "logos:html-5",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6686bci02wkq8n1hqnzu16w",
                    name: "HTML",
                    icon: "logos:html-5",
                  },
                },
              },
              {
                id: "cm6x3izil0013l103tghaqf6c",
                description: null,
                skillForUser: {
                  id: "cm675xsjx0001ji03q9k6t92e",
                  icon: "logos:css-3",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667yv0w013fq8n1tj18q87p",
                    name: "CSS",
                    icon: "logos:css-3",
                  },
                },
              },
              {
                id: "cm6x3j1mj0015l103kqevk8pk",
                description: null,
                skillForUser: {
                  id: "cm675y4tv0005ji032plmzxfa",
                  icon: "logos:javascript",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6687wto03afq8n1r577zy89",
                    name: "JavaScript",
                    icon: "logos:javascript",
                  },
                },
              },
            ],
          },
          {
            id: "cm6jvpii00001jr039qt8il87",
            name: "Met with clients and staff to plan and iterate projects.",
            description: null,
            sortIndex: 1,
            skillsForProject: [
              {
                id: "cm6x3gkla000bl103i4vb8ol0",
                description: null,
                skillForUser: {
                  id: "cm6g6m2vl0003kv03xd2ufh0x",
                  icon: "eos-icons:project-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5kqii001monncks4pvow7",
                    name: "Project Management",
                    icon: "eos-icons:project-outlined",
                  },
                },
              },
              {
                id: "cm6x3gnta000dl103qktldwtp",
                description: null,
                skillForUser: {
                  id: "cm6g6luqh0001kv039nzygvxl",
                  icon: "ant-design:shopping-twotone",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5heo9001ionncbpfyts0i",
                    name: "eCommerce",
                    icon: "ant-design:shopping-twotone",
                  },
                },
              },
              {
                id: "cm6x3grc4000fl103dgjman39",
                description: null,
                skillForUser: {
                  id: "cm6x2zmju0003lb034a1xqc7p",
                  icon: null,
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5lfyl001nonncvw3425t6",
                    name: "Search Engine Optimization (SEO)",
                    icon: "ri:seo-line",
                  },
                },
              },
              {
                id: "cm6x3gtuv000hl103e4gzmrhn",
                description: null,
                skillForUser: {
                  id: "cm68k4bma0005kv03eu4be4up",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668m40g06qgq8n10imipy0c",
                    name: "WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "cm6agwhou0003le038bkusrxl",
        title: "Graphic Designer / Web Developer, Contract",
        startDate: "1467338400000",
        endDate: "1498874400000",
        projects: [
          {
            id: "cm6jvptzx0001l503bx9jiu8u",
            name: "Designed logos and website graphics for clients.",
            description: null,
            sortIndex: 0,
            skillsForProject: [
              {
                id: "cm6x3jane0003l103myf7x52p",
                description: null,
                skillForUser: {
                  id: "cm68k9sa90003l203p8hrdf82",
                  icon: "devicon:photoshop",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v7t0007pq8n11zni5nv8",
                    name: "Adobe Photoshop",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3jd850005l103xo9sibuo",
                description: null,
                skillForUser: {
                  id: "cm68ka3640005l203n9nd19am",
                  icon: "skill-icons:illustrator",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v6j4007eq8n1fx0rztpl",
                    name: "Adobe Illustrator",
                    icon: "",
                  },
                },
              },
            ],
          },
          {
            id: "cm6jvpyza0001la03kbck969v",
            name: "Built and updated landing pages and email campaigns.",
            description: null,
            sortIndex: 1,
            skillsForProject: [
              {
                id: "cm6x3jqe20007l103ongy1xv4",
                description: null,
                skillForUser: {
                  id: "cm68k9sa90003l203p8hrdf82",
                  icon: "devicon:photoshop",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v7t0007pq8n11zni5nv8",
                    name: "Adobe Photoshop",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3jsp60009l10388x4dzci",
                description: null,
                skillForUser: {
                  id: "cm68ka3640005l203n9nd19am",
                  icon: "skill-icons:illustrator",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v6j4007eq8n1fx0rztpl",
                    name: "Adobe Illustrator",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3juqk000bl103egcyj656",
                description: null,
                skillForUser: {
                  id: "cm675xz120003ji03uuafmslg",
                  icon: "logos:html-5",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6686bci02wkq8n1hqnzu16w",
                    name: "HTML",
                    icon: "logos:html-5",
                  },
                },
              },
              {
                id: "cm6x3jxmv000dl1039u48u0hp",
                description: null,
                skillForUser: {
                  id: "cm675xsjx0001ji03q9k6t92e",
                  icon: "logos:css-3",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667yv0w013fq8n1tj18q87p",
                    name: "CSS",
                    icon: "logos:css-3",
                  },
                },
              },
              {
                id: "cm6x3k0i5000fl103o0c50e3p",
                description: null,
                skillForUser: {
                  id: "cm675y4tv0005ji032plmzxfa",
                  icon: "logos:javascript",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6687wto03afq8n1r577zy89",
                    name: "JavaScript",
                    icon: "logos:javascript",
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cm6agxp850001jr03fyu0r38p",
    name: "Self-Employed / Freelance",
    location: "Los Angeles, CA (Remote)",
    startDate: "1320192000000",
    endDate: "1530489600000",
    positions: [
      {
        id: "cm6agysn7000bl5031x5ukt4s",
        title: "Web Developer & Graphic Designer",
        startDate: "1322715600000",
        endDate: "1533009600000",
        projects: [
          {
            id: "cm6jvqg0d0001i603uaaybc88",
            name: "Met with clients to scope out work and plan projects, ensuring their visions came alive in graphics and web.",
            description: null,
            sortIndex: 0,
            skillsForProject: [
              {
                id: "cm6x3kct30017l103mjyrahe6",
                description: null,
                skillForUser: {
                  id: "cm6g6m2vl0003kv03xd2ufh0x",
                  icon: "eos-icons:project-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5kqii001monncks4pvow7",
                    name: "Project Management",
                    icon: "eos-icons:project-outlined",
                  },
                },
              },
              {
                id: "cm6x3khng0019l1035veek9w0",
                description: null,
                skillForUser: {
                  id: "cm68k9sa90003l203p8hrdf82",
                  icon: "devicon:photoshop",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v7t0007pq8n11zni5nv8",
                    name: "Adobe Photoshop",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3kjeg001bl103kd2hhbc2",
                description: null,
                skillForUser: {
                  id: "cm68ka3640005l203n9nd19am",
                  icon: "skill-icons:illustrator",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667v6j4007eq8n1fx0rztpl",
                    name: "Adobe Illustrator",
                    icon: "",
                  },
                },
              },
              {
                id: "cm6x3kyxa001dl103ndwuq7sf",
                description: null,
                skillForUser: {
                  id: "cm68k4bma0005kv03eu4be4up",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668m40g06qgq8n10imipy0c",
                    name: "WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
              {
                id: "cm6x3l1lj001fl10347qm4wrn",
                description: null,
                skillForUser: {
                  id: "cm675xz120003ji03uuafmslg",
                  icon: "logos:html-5",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6686bci02wkq8n1hqnzu16w",
                    name: "HTML",
                    icon: "logos:html-5",
                  },
                },
              },
              {
                id: "cm6x3l5i7000hl103em3xj79k",
                description: null,
                skillForUser: {
                  id: "cm675xsjx0001ji03q9k6t92e",
                  icon: "logos:css-3",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm667yv0w013fq8n1tj18q87p",
                    name: "CSS",
                    icon: "logos:css-3",
                  },
                },
              },
              {
                id: "cm6x3l7wk000jl10350t812r9",
                description: null,
                skillForUser: {
                  id: "cm675y4tv0005ji032plmzxfa",
                  icon: "logos:javascript",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6687wto03afq8n1r577zy89",
                    name: "JavaScript",
                    icon: "logos:javascript",
                  },
                },
              },
              {
                id: "cm6x3mnco000nl103zupq8nuo",
                description: null,
                skillForUser: {
                  id: "cm6x3locy000ll103jrbhwbkd",
                  icon: "devicon:jquery",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm66881k503bkq8n1xwjldtfd",
                    name: "jQuery",
                    icon: "devicon:jquery",
                  },
                },
              },
            ],
          },
          {
            id: "cm6jvql660001jm03pdylcc7a",
            name: "Worked with a variety of verticals including motorsports, legal, beauty, real estate, entertainment, places of worship, portfolios, construction, ecommerce, and education.",
            description: null,
            sortIndex: 1,
            skillsForProject: [
              {
                id: "cm6x3msxs000pl103hjjag4b5",
                description: null,
                skillForUser: {
                  id: "cm6g6m2vl0003kv03xd2ufh0x",
                  icon: "eos-icons:project-outlined",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5kqii001monncks4pvow7",
                    name: "Project Management",
                    icon: "eos-icons:project-outlined",
                  },
                },
              },
              {
                id: "cm6x3muzp000rl103wnvxw14e",
                description: null,
                skillForUser: {
                  id: "cm6g6luqh0001kv039nzygvxl",
                  icon: "ant-design:shopping-twotone",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm6g5heo9001ionncbpfyts0i",
                    name: "eCommerce",
                    icon: "ant-design:shopping-twotone",
                  },
                },
              },
              {
                id: "cm6x3mwy9000tl103wcltoc44",
                description: null,
                skillForUser: {
                  id: "cm68k4bma0005kv03eu4be4up",
                  icon: "ic:baseline-wordpress",
                  userId: "cm671iiwm0000i0034djngchg",
                  skill: {
                    id: "cm668m40g06qgq8n10imipy0c",
                    name: "WordPress",
                    icon: "ic:baseline-wordpress",
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
