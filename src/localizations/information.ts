import { Locale, PresenceStatus, Snowflake, codeBlock } from 'discord.js'

interface InformationBotOptions {
  os: {
    platform: string
    arch: string
  }
  owner: string
  nodeJSVersion: string
  pid: number
  count: {
    guild: number
    user: number
  }
  wsPing: number
  botName: string
  version: string
}

type InformationGuildSecurity =
  | '높음'
  | '낮음'
  | '중간'
  | '없음'
  | '매우 높음'
  | 'High'
  | 'Low'
  | 'Medium'
  | 'None'
  | 'Very High'

interface InformationGuildOptions {
  name: string
  owner: {
    name: string
    id: Snowflake
  }
  count: {
    boost: number
    member: number
    bot: number
    memberOnly: number
    emoji: number
    sticky: number
  }
  security: InformationGuildSecurity
}

interface InformationUserOptions {
  name: string
  status:
    | '없음'
    | '온라인'
    | '자리 비움'
    | '다른 용무 중'
    | '오프라인'
    | undefined
    | PresenceStatus
    | 'None'
  isBot: string
  nickname: string
}

export function getInformation(locale: Locale) {
  if (locale === Locale.Korean) {
    return {
      bot(options: InformationBotOptions) {
        return codeBlock(
          'md',
          `# OS 정보
- ${options.os.platform} ${options.os.arch}

# 봇 개발자
- ${options.owner}

# Node.js 버전
- ${options.nodeJSVersion}

# PID
- ${options.pid}

# 서버수
- ${options.count.guild}

# 유저수
- ${options.count.user}

# 지연시간
- ${options.wsPing}ms

# ${options.botName} 버젼
- ${options.version}`,
        )
      },
      guild(options: InformationGuildOptions) {
        return codeBlock(
          'md',
          `# 이름
- ${options.name}

# 소유자
- ${options.owner.name} (${options.owner.id})

# 부스트 갯수
- ${options.count.boost}

# 보안단계
- ${options.security}

# 멤버  (봇 포함)
- ${options.count.member}

# 봇 개수
- ${options.count.bot}

# 멤버 수 (봇 제외)
- ${options.count.memberOnly}

# 이모지 수
- ${options.count.emoji}

# 스티커 수
- ${options.count.sticky}`,
        )
      },
      user(options: InformationUserOptions) {
        return codeBlock(
          'md',
          `# 이름
- ${options.name}

# 상태
- ${options.status}

# 봇
- ${options.isBot}

# 별명
- ${options.nickname}`,
        )
      },
    }
  } else {
    return {
      bot(options: InformationBotOptions) {
        return codeBlock(
          'md',
          `# OS information
- ${options.os.platform} ${options.os.arch}

# Developer
- ${options.owner}

# Node.JS version
- ${options.nodeJSVersion}

# PID
- ${options.pid}

# Guild count
- ${options.count.guild}

# User count
- ${options.count.user}

# Ping
- ${options.wsPing}

# ${options.botName} version
- ${options.version}`,
        )
      },
      guild(options: InformationGuildOptions) {
        return codeBlock(
          'md',
          `# Name
- ${options.name}

# Owner
- ${options.owner.name} (${options.owner.id})

# Boost count
- ${options.count.boost}

# Member count (Bot include)
- ${options.count.member}

# Bot count
- ${options.count.bot}

# Member count (Bot exclude)
- ${options.count.memberOnly}

# Emoji count
- ${options.count.emoji}

# Sticky count
- ${options.count.sticky}`,
        )
      },
      user(options: InformationUserOptions) {
        return codeBlock(
          'md',
          `# Name
- ${options.name}

# Status
- ${options.status}

# Is bot
- ${options.isBot}

# Nickname
- ${options.nickname}`,
        )
      },
    }
  }
}
