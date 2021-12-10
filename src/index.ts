import { ProfanityFilter } from './logic/common/profanity-filter'
import { MaskMode } from './enums/mask-mode.enum'
import { GenericProfanityFilter, SouthAfricanProfanityFilter } from './logic/profanity-filters'

exports = {
    ProfanityFilter: ProfanityFilter,
    GenericProfanityFilter: GenericProfanityFilter,
    SouthAfricanProfanityFilter: SouthAfricanProfanityFilter,
    MaskMode: MaskMode
}
