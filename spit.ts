import yargs from 'https://deno.land/x/yargs/deno.ts'
import { parse as yamlParse } from 'https://deno.land/std@0.82.0/encoding/yaml.ts'

type SpitArgs = {
  _: string[]
  ips: string[]
  test: number
  config: string
  $0: string
}

type SpitConfig = {
  hostname: string
  username: string
  key: string
}

type ScamalyticsApiRequest = {
  status: 'ok' | 'error'
  error?: string
  mode: 'test' | 'live'
  ip: string
  score: number
  risk: 'low' | 'medium' | 'high' | 'very high'
  url: string
  credits: ScamalyticsCredits
  exec: string
}

type ScamalyticsCredits = {
  used: number
  remaining: number
}

const args: SpitArgs = yargs()
  .scriptName('spit')
  .command(
    'check <ips...>',
    'Check a list of ips for scammers',
    (yargs: any) => {
      return yargs
        .positional('ips', {
          describe: 'A list of IPs to check against scamalytics api'
        })
        .option('test', {
          description:
            'Perform a test request rather than a real one (data will be invalid)',
          alias: 't',
          default: 0
        })
    }
  )
  .option('config', {
    description:
      'Configuration for application, will contain your api user and key',
    alias: 'c',
    default: `${Deno.env.get('HOME')}/.spit.yaml`
  })
  .strictCommands()
  .demandCommand(1)
  .parse(Deno.args)

console.info(args)

const config = yamlParse(
  await Deno.readTextFile(
    await Deno.realPath(args.config)
  )
) as SpitConfig

args.ips.forEach(async (ip: string) => {
  const url = `https://${config.hostname}/${config.username}/?key=${config.key}&ip=${ip}&test=${args.test}`
  const resp = await fetch(url)
  const data = await resp.json() as ScamalyticsApiRequest
  console.log(data)
})
