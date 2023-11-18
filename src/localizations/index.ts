import { Locale, PermissionFlagsBits } from 'discord.js'
import english from './langs/en.json'
import korean from './langs/ko.json'
import { TDate, format, register } from 'timeago.js'

export function localization(locale: Locale) {
  if (locale === Locale.Korean) {
    return korean
  } else {
    return english
  }
}

export function timeago(date: TDate, locale?: Locale) {
  register('ko', (number, index) => {
    return [
      ['방금', '곧'],
      ['%s초 전', '%s초 후'],
      ['1분 전', '1분 후'],
      ['%s분 전', '%s분 후'],
      ['1시간 전', '1시간 후'],
      ['%s시간 전', '%s시간 후'],
      ['1일 전', '1일 후'],
      ['%s일 전', '%s일 후'],
      ['1주일 전', '1주일 후'],
      ['%s주일 전', '%s주일 후'],
      ['1개월 전', '1개월 후'],
      ['%s개월 전', '%s개월 후'],
      ['1년 전', '1년 후'],
      ['%s년 전', '%s년 후'],
    ][index] as [string, string]
  })

  if (locale === Locale.Korean) {
    return format(date, 'ko')
  } else {
    return format(date)
  }
}

export function time(locale: Locale, time: Date) {
  if (locale === Locale.Korean) {
    return time.toLocaleDateString('ko-KR')
  } else {
    return time.toLocaleDateString('en-US')
  }
}

export function getPermissionLocalization(locale: Locale, permission: bigint) {
  if (locale === Locale.Korean) {
    switch (permission) {
      case PermissionFlagsBits.KickMembers:
        return '멤버 추방하기'
      case PermissionFlagsBits.ManageMessages:
        return '메세지 관리'
      case PermissionFlagsBits.ManageChannels:
        return '채널 관리하기'
    }
  } else {
    switch (permission) {
      case PermissionFlagsBits.KickMembers:
        return 'Kick Members'
      case PermissionFlagsBits.ManageMessages:
        return 'Manage Messages'
      case PermissionFlagsBits.ManageChannels:
        return 'Manage Channels'
    }
  }
}

export function isHavePermission(options: {
  locale: Locale
  permission: string
  isBot?: boolean
}) {
  if (options.locale === Locale.Korean) {
    if (options.isBot) {
      return korean.if_dont_have_permission.bot.replace(
        '{permission}',
        options.permission,
      )
    } else {
      return korean.if_dont_have_permission.user.replace(
        '{permission}',
        options.permission,
      )
    }
  } else {
    if (options.isBot) {
      return korean.if_dont_have_permission.bot.replace(
        '{permission}',
        options.permission,
      )
    } else {
      return korean.if_dont_have_permission.user.replace(
        '{permission}',
        options.permission,
      )
    }
  }
}

export function getSmhdw(
  locale: Locale,
  smhdw: 'sec' | 'minute' | 'hour' | 'day' | 'week',
) {
  if (locale === Locale.Korean) {
    switch (smhdw) {
      case 'sec':
        return '초'
      case 'minute':
        return '분'
      case 'hour':
        return '시간'
      case 'day':
        return '일'
      case 'week':
        return '주'
    }
  } else {
    return smhdw
  }
}

export * from './information.js'
export { english, korean }
