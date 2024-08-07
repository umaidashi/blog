import { IconContext } from 'react-icons'
import {
  SiAstro,
  SiC,
  SiDart,
  SiDatadog,
  SiDebian,
  SiDiscord,
  SiDjango,
  SiDocker,
  SiDrizzle,
  SiFigma,
  SiFlask,
  SiFlutter,
  SiGin,
  SiGithub,
  SiGithubactions,
  SiGo,
  SiGooglebigquery,
  SiGooglecloud,
  SiGooglecloudstorage,
  SiGraphql,
  SiHono,
  SiJavascript,
  SiJira,
  SiJirasoftware,
  SiLinux,
  SiMui,
  SiMysql,
  SiNeovim,
  SiNewrelic,
  SiNextdotjs,
  SiPlanetscale,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPug,
  SiPython,
  SiR,
  SiReact,
  SiRemix,
  SiRender,
  SiRuby,
  SiRubyonrails,
  SiSass,
  SiSentry,
  SiShadcnui,
  SiSketch,
  SiSlack,
  SiStyledcomponents,
  SiSupabase,
  SiSwift,
  SiTypescript,
  SiVercel,
  SiVim,
  SiZod,
  SiZsh
} from 'react-icons/si'
import { tv } from 'tailwind-variants'
import { Header } from '~/components/header'
import PageTitle from '~/components/page_title'

const profile = tv({
  slots: {
    section: 'mb-12',
    sectionH2: 'text-xl font-bold mt-4 mb-3',
    sectionH3: 'text-md font-semibold mt-3 mb-2 underline decoration-dotted underline-offset-4',
    paragraph: 'font-medium',
    table: 'w-4/6 table-auto',
    th: 'py-1 px-2 bg-secondary text-start',
    td: 'p-2 text-start font-medium'
  }
})

const { section, sectionH2, sectionH3, paragraph, table, th, td } = profile()

export default function Profile() {
  return (
    <div>
      <Header />
      <PageTitle title='oidon. - umaidashi' />
      <section className={section()}>
        <h2 className={sectionH2()}>About</h2>
        <table className={table()}>
          <thead>
            <tr>
              <th className={th()}>key</th>
              <th className={th()}>value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={td()}>Name</td>
              <td className={td()}>Oishi Yuma</td>
            </tr>
            <tr>
              <td className={td()}>Birth Day</td>
              <td className={td()}>2002.11.18</td>
            </tr>
            <tr>
              <td className={td()}>Hometown</td>
              <td className={td()}>Fukuoka</td>
            </tr>
            <tr>
              <td className={td()}>Hometown</td>
              <td className={td()}>Fukuoka</td>
            </tr>
            <tr>
              <td className={td()}>Display Name</td>
              <td className={td()}>['umaidashi', 'oidon']</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className={section()}>
        <h2 className={sectionH2()}>Skills</h2>
        <h3 className={sectionH3()}>Languages</h3>
        <div className='flex gap-2'>
          <IconContext.Provider value={{ className: 'text-3xl' }}>
            <SiGo />
            <SiTypescript />
            <SiJavascript />
            <SiC />
            <SiPython />
            <SiRuby />
            <SiZsh />
            <SiDart />
            <SiSwift />
            <SiR />
            <SiPug />
            <SiSass />
          </IconContext.Provider>
        </div>
        <h3 className={sectionH3()}>Frameworks</h3>
        <div className='flex gap-2'>
          <IconContext.Provider value={{ className: 'text-3xl' }}>
            <SiGin />
            <SiReact />
            <SiNextdotjs />
            <SiHono />
            <SiAstro />
            <SiRemix />
            <SiDjango />
            <SiFlask />
            <SiRubyonrails />
            <SiFlutter />
          </IconContext.Provider>
        </div>
        <h3 className={sectionH3()}>Libraries</h3>
        <div className='flex gap-2'>
          <IconContext.Provider value={{ className: 'text-3xl' }}>
            <SiPrisma />
            <SiDrizzle />
            <SiZod />
            <SiMui />
            <SiShadcnui />
            <SiGraphql />
            <SiStyledcomponents />
          </IconContext.Provider>
        </div>
        <h3 className={sectionH3()}>RDBMS / BaaS</h3>
        <div className='flex gap-2'>
          <IconContext.Provider value={{ className: 'text-3xl' }}>
            <SiPostgresql />
            <SiPlanetscale />
            <SiSupabase />
            <SiMysql />
          </IconContext.Provider>
        </div>
        <h3 className={sectionH3()}>Others</h3>
        <div className='flex gap-2'>
          <IconContext.Provider value={{ className: 'text-3xl' }}>
            <SiNeovim />
            <SiVim />
            <SiVercel />
            <SiRender />
            <SiSentry />
            <SiDatadog />
            <SiNewrelic />
            <SiDebian />
            <SiLinux />
            <SiSlack />
            <SiDiscord />
            <SiSketch />
            <SiFigma />
            <SiGithub />
            <SiGithubactions />
            <SiDocker />
            <SiGooglecloud />
            <SiGooglebigquery />
            <SiGooglecloudstorage />
            <SiPostman />
            <SiJira />
            <SiJirasoftware />
          </IconContext.Provider>
        </div>
      </section>
    </div>
  )
}
