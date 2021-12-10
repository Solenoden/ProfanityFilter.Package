import { ProfanityFilter } from './common/profanity-filter'
import { genericProfanityList } from '../profanity-lists/generic-profanity-list'
import { MaskMode } from '../enums/mask-mode.enum'
import { southAfricanProfanityList } from '../profanity-lists/south-african-profanity-list'

export class GenericProfanityFilter extends ProfanityFilter {
    constructor(maskMode: MaskMode = MaskMode.Asterisk, grawlixCharacters?: string[]) {
        super(genericProfanityList, maskMode, grawlixCharacters)
    }
}

export class SouthAfricanProfanityFilter extends ProfanityFilter {
    constructor(maskMode: MaskMode = MaskMode.Asterisk, grawlixCharacters?: string[]) {
        super(southAfricanProfanityList, maskMode, grawlixCharacters)
    }
}
