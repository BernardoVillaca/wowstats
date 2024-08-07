import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  jsonb,
  boolean
} from "drizzle-orm/pg-core";


export const createTable = pgTableCreator((name) => `wowstats_${name}`);

export const RatingsCutoff = createTable(
  "ratings_cuttoffs",
  {
    id: serial("id").primaryKey(),
    us_cutoffs: jsonb("us_cutoffs"),
    eu_cutoffs: jsonb("eu_cutoffs"),
    classic_us_cutoffs: jsonb("classic_us_cutoffs"),
    classic_eu_cutoffs: jsonb("classic_eu_cutoffs"),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`)
  }
);

export const classSpecStatistics = createTable(
  "class_spec_statistics",
  {
    id: serial("id").primaryKey(),

    classic_us_rbg: jsonb("classic_us_rbg").default(sql`'[]'::jsonb`),
    classic_us_2v2: jsonb("classic_us_2v2").default(sql`'[]'::jsonb`),
    classic_us_3v3: jsonb("classic_us_3v3").default(sql`'[]'::jsonb`),

    classic_eu_rbg: jsonb("classic_eu_rbg").default(sql`'[]'::jsonb`),
    classic_eu_2v2: jsonb("classic_eu_2v2").default(sql`'[]'::jsonb`),
    classic_eu_3v3: jsonb("classic_eu_3v3").default(sql`'[]'::jsonb`),

    retail_us_rbg: jsonb("retail_us_rbg").default(sql`'[]'::jsonb`),
    retail_us_2v2: jsonb("retail_us_2v2").default(sql`'[]'::jsonb`),
    retail_us_3v3: jsonb("retail_us_3v3").default(sql`'[]'::jsonb`),
    retail_us_shuffle: jsonb("retail_us_shuffle").default(sql`'[]'::jsonb`),

    retail_eu_rbg: jsonb("retail_eu_rbg").default(sql`'[]'::jsonb`),
    retail_eu_2v2: jsonb("retail_eu_2v2").default(sql`'[]'::jsonb`),
    retail_eu_3v3: jsonb("retail_eu_3v3").default(sql`'[]'::jsonb`),
    retail_eu_shuffle: jsonb("retail_eu_shuffle").default(sql`'[]'::jsonb`),

    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`)
  }
);



export const activityStatistics = createTable(
  "activity_statistics",
  {
    id: serial("id").primaryKey(),
    classic_us_rbg: jsonb("classic_us_rbg").default(sql`'[]'::jsonb`),
    classic_us_2v2: jsonb("classic_us_2v2").default(sql`'[]'::jsonb`),
    classic_us_3v3: jsonb("classic_us_3v3").default(sql`'[]'::jsonb`),

    classic_eu_rbg: jsonb("classic_eu_rbg").default(sql`'[]'::jsonb`),
    classic_eu_2v2: jsonb("classic_eu_2v2").default(sql`'[]'::jsonb`),
    classic_eu_3v3: jsonb("classic_eu_3v3").default(sql`'[]'::jsonb`),

    retail_us_rbg: jsonb("retail_us_rbg").default(sql`'[]'::jsonb`),
    retail_us_2v2: jsonb("retail_us_2v2").default(sql`'[]'::jsonb`),
    retail_us_3v3: jsonb("retail_us_3v3").default(sql`'[]'::jsonb`),
    retail_us_shuffle: jsonb("retail_us_shuffle").default(sql`'[]'::jsonb`),

    retail_eu_rbg: jsonb("retail_eu_rbg").default(sql`'[]'::jsonb`),
    retail_eu_2v2: jsonb("retail_eu_2v2").default(sql`'[]'::jsonb`),
    retail_eu_3v3: jsonb("retail_eu_3v3").default(sql`'[]'::jsonb`),
    retail_eu_shuffle: jsonb("retail_eu_shuffle").default(sql`'[]'::jsonb`),

    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
  }
);

export const retailLegacyLeaderboard = createTable(
  "retail_legacy_leaderboards",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    bracket: varchar("bracket", { length: 256 }),
    pvp_season_index: integer("pvp_season_index"),
    region: varchar("region", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`)
  },
  (leaderboard) => ({
    retailLegacyPrimaryIndex: index("retail_legacy_primary_idx").on(
      leaderboard.character_id,
      leaderboard.bracket,
      leaderboard.pvp_season_index,
      leaderboard.region),
    retailLegacyCharacterNameIndex: index("retail_legacy_character_name_idx").on(leaderboard.character_name),
    retailLegacyCharacterIdIndex: index("retail_legacy_character_id_idx").on(leaderboard.character_id),
    retailLegacyCharacterClassIndex: index("retail_legacy_character_class_idx").on(leaderboard.character_class),
    retailLegacyCharacterSpecIndex: index("retail_legacy_character_spec_idx").on(leaderboard.character_spec),
    retailLegacyFactionNameIndex: index("retail_legacy_faction_name_idx").on(leaderboard.faction_name),
    retailLegacyRankIndex: index("retail_legacy_rank_idx").on(leaderboard.rank),
    retailLegacyRatingIndex: index("retail_legacy_rating_idx").on(leaderboard.rating),
    retailLegacyPlayedIndex: index("retail_legacy_played_idx").on(leaderboard.played),
    retailLegacyWinRatioIndex: index("retail_legacy_win_ratio_idx").on(leaderboard.win_ratio),
    retailLegacyBracketIndex: index("retail_legacy_bracket_idx").on(leaderboard.bracket),
    retailLegacyPvpSeasonIndexIndex: index("retail_legacy_pvp_season_index_idx").on(leaderboard.pvp_season_index),
    retailLegacyRegionIndex: index("retail_legacy_region_idx").on(leaderboard.region),
  })
);

export const us3v3Leaderboard = createTable(
  "us_3v3_leaderboard",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    history: jsonb("history").default(sql`'[]'::jsonb`),
    present: boolean("present").default(false)

  },
  (leaderboard) => ({
    us3v3PrimaryIndex: index("us_3v3_primary_idx").on(
      leaderboard.character_name,
      leaderboard.realm_slug,
    ),
    us3v3CharacterNameIndex: index("us_3v3_character_name_idx").on(leaderboard.character_name),
    us3v3CharacterIdIndex: index("us_3v3_character_id_idx").on(leaderboard.character_id),
    us3v3CharacterClassIndex: index("us_3v3_character_class_idx").on(leaderboard.character_class),
    us3v3CharacterSpecIndex: index("us_3v3_character_spec_idx").on(leaderboard.character_spec),
    us3v3FactionNameIndex: index("us_3v3_faction_name_idx").on(leaderboard.faction_name),
    us3v3RankIndex: index("us_3v3_rank_idx").on(leaderboard.rank),
    us3v3RatingIndex: index("us_3v3_rating_idx").on(leaderboard.rating),
    us3v3PlayedIndex: index("us_3v3_played_idx").on(leaderboard.played),
    us3v3WinRatioIndex: index("us_3v3_win_ratio_idx").on(leaderboard.win_ratio),
  })
);

export const us2v2Leaderboard = createTable(
  "us_2v2_leaderboard",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    history: jsonb("history").default(sql`'[]'::jsonb`),
    present: boolean("present").default(false)

  },
  (leaderboard) => ({
    us2v2PrimaryIndex: index("us_2v2_primary_idx").on(
      leaderboard.character_name,
      leaderboard.realm_slug,
    ),
    us2v2CharacterNameIndex: index("us_2v2_character_name_idx").on(leaderboard.character_name),
    us2v2CharacterIdIndex: index("us_2v2_character_id_idx").on(leaderboard.character_id),
    us2v2CharacterClassIndex: index("us_2v2_character_class_idx").on(leaderboard.character_class),
    us2v2CharacterSpecIndex: index("us_2v2_character_spec_idx").on(leaderboard.character_spec),
    us2v2FactionNameIndex: index("us_2v2_faction_name_idx").on(leaderboard.faction_name),
    us2v2RankIndex: index("us_2v2_rank_idx").on(leaderboard.rank),
    us2v2RatingIndex: index("us_2v2_rating_idx").on(leaderboard.rating),
    us2v2PlayedIndex: index("us_2v2_played_idx").on(leaderboard.played),
    us2v2WinRatioIndex: index("us_2v2_win_ratio_idx").on(leaderboard.win_ratio)
  })
);

export const usRBGLeaderboard = createTable(
  "us_RBG_leaderboard",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    history: jsonb("history").default(sql`'[]'::jsonb`),
    present: boolean("present").default(false)

  },
  (leaderboard) => ({
    usRbgPrimaryIndex: index("us_rbg_primary_idx").on(
      leaderboard.character_name,
      leaderboard.realm_slug,
    ),
    usRBGCharacterNameIndex: index("us_RBG_character_name_idx").on(leaderboard.character_name),
    usRBGCharacterIdIndex: index("us_RBG_character_id_idx").on(leaderboard.character_id),
    usRBGCharacterClassIndex: index("us_RBG_character_class_idx").on(leaderboard.character_class),
    usRBGCharacterSpecIndex: index("us_RBG_character_spec_idx").on(leaderboard.character_spec),
    usRBGFactionNameIndex: index("us_RBG_faction_name_idx").on(leaderboard.faction_name),
    usRBGRankIndex: index("us_RBG_rank_idx").on(leaderboard.rank),
    usRBGRatingIndex: index("us_RBG_rating_idx").on(leaderboard.rating),
    usRBGPlayedIndex: index("us_RBG_played_idx").on(leaderboard.played),
    usRBGWinRatioIndex: index("us_RBG_win_ratio_idx").on(leaderboard.win_ratio)
  })
);
export const usShuffleLeaderboard = createTable(
  "us_Shuffle_leaderboard",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    history: jsonb("history").default(sql`'[]'::jsonb`),
    present: boolean("present").default(false)

  },
  (leaderboard) => ({
    usShufflePrimaryIndex: index("us_shuffle_primary_idx").on(
      leaderboard.character_name,
      leaderboard.realm_slug,
      leaderboard.character_spec
    ),
    usShuffleCharacterNameIndex: index("us_shuffle_character_name_idx").on(leaderboard.character_name),
    usShuffleCharacterIdIndex: index("us_shuffle_character_id_idx").on(leaderboard.character_id),
    usShuffleCharacterClassIndex: index("us_shuffle_character_class_idx").on(leaderboard.character_class),
    usShuffleCharacterSpecIndex: index("us_shuffle_character_spec_idx").on(leaderboard.character_spec),
    usShuffleFactionNameIndex: index("us_shuffle_faction_name_idx").on(leaderboard.faction_name),
    usShuffleRankIndex: index("us_shuffle_rank_idx").on(leaderboard.rank),
    usShuffleRatingIndex: index("us_shuffle_rating_idx").on(leaderboard.rating),
    usShufflePlayedIndex: index("us_shuffle_played_idx").on(leaderboard.played),
    usShuffleWinRatioIndex: index("us_shuffle_win_ratio_idx").on(leaderboard.win_ratio),
  })
);

export const eu3v3Leaderboard = createTable(
  "eu_3v3_leaderboard",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    history: jsonb("history").default(sql`'[]'::jsonb`),
    present: boolean("present").default(false)


  },
  (leaderboard) => ({
    eu3v3PrimaryIndex: index("eu_3v3_primary_idx").on(
      leaderboard.character_name,
      leaderboard.realm_slug,
    ),
    eu3v3CharacterNameIndex: index("eu_3v3_character_name_idx").on(leaderboard.character_name),
    eu3v3CharacterIdIndex: index("eu_3v3_character_id_idx").on(leaderboard.character_id),
    eu3v3CharacterClassIndex: index("eu_3v3_character_class_idx").on(leaderboard.character_class),
    eu3v3CharacterSpecIndex: index("eu_3v3_character_spec_idx").on(leaderboard.character_spec),
    eu3v3FactionNameIndex: index("eu_3v3_faction_name_idx").on(leaderboard.faction_name),
    eu3v3RankIndex: index("eu_3v3_rank_idx").on(leaderboard.rank),
    eu3v3RatingIndex: index("eu_3v3_rating_idx").on(leaderboard.rating),
    eu3v3PlayedIndex: index("eu3v3_played_idx").on(leaderboard.played),
    eu3v3WinRatioIndex: index("eu_3v3_win_ratio_idx").on(leaderboard.win_ratio),
  })
);

export const eu2v2Leaderboard = createTable(
  "eu_2v2_leaderboard",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    history: jsonb("history").default(sql`'[]'::jsonb`),
    present: boolean("present").default(false)


  },
  (leaderboard) => ({
    eu2v2PrimaryIndex: index("eu_2v2_primary_idx").on(
      leaderboard.character_name,
      leaderboard.realm_slug,
    ),
    eu2v2CharacterNameIndex: index("eu_2v2_character_name_idx").on(leaderboard.character_name),
    eu2v2CharacterIdIndex: index("eu_2v2_character_id_idx").on(leaderboard.character_id),
    eu2v2CharacterClassIndex: index("eu_2v2_character_class_idx").on(leaderboard.character_class),
    eu2v2CharacterSpecIndex: index("eu_2v2_character_spec_idx").on(leaderboard.character_spec),
    eu2v2FactionNameIndex: index("eu_2v2_faction_name_idx").on(leaderboard.faction_name),
    eu2v2RankIndex: index("eu_2v2_rank_idx").on(leaderboard.rank),
    eu2v2RatingIndex: index("eu_2v2_rating_idx").on(leaderboard.rating),
    eu2v2PlayedIndex: index("eu_2v2_played_idx").on(leaderboard.played),
    eu2v2WinRatioIndex: index("eu_2v2_win_ratio_idx").on(leaderboard.win_ratio),
  })
);

export const euRBGLeaderboard = createTable(
  "eu_RBG_leaderboard",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    history: jsonb("history").default(sql`'[]'::jsonb`),
    present: boolean("present").default(false)


  },
  (leaderboard) => ({
    euRbgPrimaryIndex: index("eu_rbg_primary_idx").on(
      leaderboard.character_name,
      leaderboard.realm_slug,
    ),
    euRBGCharacterNameIndex: index("eu_RBG_character_name_idx").on(leaderboard.character_name),
    euRBGCharacterIdIndex: index("eu_RBG_character_id_idx").on(leaderboard.character_id),
    euRBGCharacterClassIndex: index("eu_RBG_character_class_idx").on(leaderboard.character_class),
    euRBGCharacterSpecIndex: index("eu_RBG_character_spec_idx").on(leaderboard.character_spec),
    euRBGFactionNameIndex: index("eu_RBG_faction_name_idx").on(leaderboard.faction_name),
    euRBGRankIndex: index("eu_RBG_rank_idx").on(leaderboard.rank),
    euRBGRatingIndex: index("eu_RBG_rating_idx").on(leaderboard.rating),
    euRBGPlayedIndex: index("eu_RBG_played_idx").on(leaderboard.played),
    euRBGWinRatioIndex: index("eu_RBG_win_ratio_idx").on(leaderboard.win_ratio),
  }))

export const euShuffleLeaderboard = createTable(
  "eu_Shuffle_leaderboard",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    history: jsonb("history").default(sql`'[]'::jsonb`),
    present: boolean("present").default(false)

  },
  (leaderboard) => ({
    euShufflePrimaryIndex: index("eu_shuffle_primary_idx").on(
      leaderboard.character_name,
      leaderboard.realm_slug,
      leaderboard.character_spec
    ),
    euShuffleCharacterNameIndex: index("eu_shuffle_character_name_idx").on(leaderboard.character_name),
    euShuffleCharacterIdIndex: index("eu_shuffle_character_id_idx").on(leaderboard.character_id),
    euShuffleCharacterClassIndex: index("eu_shuffle_character_class_idx").on(leaderboard.character_class),
    euShuffleCharacterSpecIndex: index("eu_shuffle_character_spec_idx").on(leaderboard.character_spec),
    euShuffleFactionNameIndex: index("eu_shuffle_faction_name_idx").on(leaderboard.faction_name),
    euShuffleRankIndex: index("eu_shuffle_rank_idx").on(leaderboard.rank),
    euShuffleRatingIndex: index("eu_shuffle_rating_idx").on(leaderboard.rating),
    euShufflePlayedIndex: index("eu_shuffle_played_idx").on(leaderboard.played),
    euShuffleWinRatioIndex: index("eu_shuffle_win_ratio_idx").on(leaderboard.win_ratio),
  })
);

export const classicUs3v3Leaderboard = createTable(
  "classic_us_3v3_leaderboard",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    history: jsonb("history").default(sql`'[]'::jsonb`),
    present: boolean("present").default(false)

  },
  (leaderboard) => ({
    classicUs3v3PrimaryIndex: index("classic_us_3v3_primary_idx").on(
      leaderboard.character_name,
      leaderboard.realm_slug,
    ),
    classicUs3v3CharacterNameIndex: index("classic_us_3v3_character_name_idx").on(leaderboard.character_name),
    classicUs3v3CharacterIdIndex: index("classic_us_3v3_character_id_idx").on(leaderboard.character_id),
    classicUs3v3CharacterClassIndex: index("classic_us_3v3_character_class_idx").on(leaderboard.character_class),
    classicUs3v3CharacterSpecIndex: index("classic_us_3v3_character_spec_idx").on(leaderboard.character_spec),
    classicUs3v3FactionNameIndex: index("classic_us_3v3_faction_name_idx").on(leaderboard.faction_name),
    classicUs3v3RankIndex: index("classic_us_3v3_rank_idx").on(leaderboard.rank),
    classicUs3v3RatingIndex: index("classic_us_3v3_rating_idx").on(leaderboard.rating),
    classicUs3v3PlayedIndex: index("classic_us_3v3_played_idx").on(leaderboard.played),
    classicUs3v3WinRatioIndex: index("classic_us_3v3_win_ratio_idx").on(leaderboard.win_ratio)
  })
);

export const classicUs2v2Leaderboard = createTable(
  "classic_us_2v2_leaderboard",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    history: jsonb("history").default(sql`'[]'::jsonb`),
    present: boolean("present").default(false)

  },
  (leaderboard) => ({
    classicUs2v2PrimaryIndex: index("classic_us_2v2_primary_idx").on(
      leaderboard.character_name,
      leaderboard.realm_slug,
    ),
    classicUs2v2CharacterNameIndex: index("classic_us_2v2_character_name_idx").on(leaderboard.character_name),
    classicUs2v2CharacterIdIndex: index("classic_us_2v2_character_id_idx").on(leaderboard.character_id),
    classicUs2v2CharacterClassIndex: index("classic_us_2v2_character_class_idx").on(leaderboard.character_class),
    classicUs2v2CharacterSpecIndex: index("classic_us_2v2_character_spec_idx").on(leaderboard.character_spec),
    classicUs2v2FactionNameIndex: index("classic_us_2v2_faction_name_idx").on(leaderboard.faction_name),
    classicUs2v2RankIndex: index("classic_us_2v2_rank_idx").on(leaderboard.rank),
    classicUs2v2RatingIndex: index("classic_us_2v2_rating_idx").on(leaderboard.rating),
    classicUs2v2PlayedIndex: index("classic_us_2v2_played_idx").on(leaderboard.played),
    classicUs2v2WinRatioIndex: index("classic_us_2v2_win_ratio_idx").on(leaderboard.win_ratio)
  })
);

export const classicUsRBGLeaderboard = createTable(
  "classic_us_RBG_leaderboard",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    history: jsonb("history").default(sql`'[]'::jsonb`),
    present: boolean("present").default(false)

  },
  (leaderboard) => ({
    classicUsRbgPrimaryIndex: index("classic_us_rbg_primary_idx").on(
      leaderboard.character_name,
      leaderboard.realm_slug,
    ),
    classicUsRBGCharacterNameIndex: index("classic_us_RBG_character_name_idx").on(leaderboard.character_name),
    classicUsRBGCharacterIdIndex: index("classic_us_RBG_character_id_idx").on(leaderboard.character_id),
    classicUsRBGCharacterClassIndex: index("classic_us_RBG_character_class_idx").on(leaderboard.character_class),
    classicUsRBGCharacterSpecIndex: index("classic_us_RBG_character_spec_idx").on(leaderboard.character_spec),
    classicUsRBGFactionNameIndex: index("classic_us_RBG_faction_name_idx").on(leaderboard.faction_name),
    classicUsRBGRankIndex: index("classic_us_RBG_rank_idx").on(leaderboard.rank),
    classicUsRBGRatingIndex: index("classic_us_RBG_rating_idx").on(leaderboard.rating),
    classicUsRBGPlayedIndex: index("classic_us_RBG_played_idx").on(leaderboard.played),
    classicUsRBGWinRatioIndex: index("classic_us_RBG_win_ratio_idx").on(leaderboard.win_ratio)
  })
);


export const classicEu3v3Leaderboard = createTable(
  "classic_eu_3v3_leaderboard",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    history: jsonb("history").default(sql`'[]'::jsonb`),
    present: boolean("present").default(false)

  },
  (leaderboard) => ({
    classicEu3v3PrimaryIndex: index("classic_eu_3v3_primary_idx").on(
      leaderboard.character_name,
      leaderboard.realm_slug,
    ),
    classicEu3v3CharacterNameIndex: index("classic_eu_3v3_character_name_idx").on(leaderboard.character_name),
    classicEu3v3CharacterIdIndex: index("classic_eu3_v3_character_id_idx").on(leaderboard.character_id),
    classicEu3v3CharacterClassIndex: index("classic_eu_3v3_character_class_idx").on(leaderboard.character_class),
    classicEu3v3CharacterSpecIndex: index("classic_eu_3v3_character_spec_idx").on(leaderboard.character_spec),
    classicEu3v3FactionNameIndex: index("classic_eu_3v3_faction_name_idx").on(leaderboard.faction_name),
    classicEu3v3RankIndex: index("classic_eu_3v3_rank_idx").on(leaderboard.rank),
    classicEu3v3RatingIndex: index("classic_eu_3v3_rating_idx").on(leaderboard.rating),
    classicEu3v3PlayedIndex: index("classic_eu_3v3_played_idx").on(leaderboard.played),
    classicEu3v3WinRatioIndex: index("classic_eu_3v3_win_ratio_idx").on(leaderboard.win_ratio)
  })
);

export const classicEu2v2Leaderboard = createTable(
  "classic_eu_2v2_leaderboard",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    history: jsonb("history").default(sql`'[]'::jsonb`),
    present: boolean("present").default(false)

  },
  (leaderboard) => ({
    classicEu2v2PrimaryIndex: index("classic_eu_2v2_primary_idx").on(
      leaderboard.character_name,
      leaderboard.realm_slug,
    ),
    classicEu2v2CharacterNameIndex: index("classic_eu_2v2_character_name_idx").on(leaderboard.character_name),
    classicEu2v2CharacterIdIndex: index("classic_eu_2v2_character_id_idx").on(leaderboard.character_id),
    classicEu2v2CharacterClassIndex: index("classic_eu_2v2_character_class_idx").on(leaderboard.character_class),
    classicEu2v2CharacterSpecIndex: index("classic_eu_2v2_character_spec_idx").on(leaderboard.character_spec),
    classicEu2v2FactionNameIndex: index("classic_eu_2v2_faction_name_idx").on(leaderboard.faction_name),
    classicEu2v2RankIndex: index("classic_eu_2v2_rank_idx").on(leaderboard.rank),
    classicEu2v2RatingIndex: index("classic_eu_2v2_rating_idx").on(leaderboard.rating),
    classicEu2v2PlayedIndex: index("classic_eu_2v2_played_idx").on(leaderboard.played),
    classicEu2v2WinRatioIndex: index("classic_eu_2v2_win_ratio_idx").on(leaderboard.win_ratio)
  })
);

export const classicEuRBGLeaderboard = createTable(
  "classic_eu_RBG_leaderboard",
  {
    character_name: varchar("character_name", { length: 256 }),
    character_id: integer("character_id"),
    character_class: varchar("character_class", { length: 256 }).default(''),
    character_spec: varchar("character_spec", { length: 256 }).default(''),
    realm_id: integer("realm_id"),
    realm_slug: varchar("realm_slug", { length: 256 }),
    faction_name: varchar("faction_name", { length: 256 }),
    rank: integer("rank"),
    rating: integer("rating"),
    played: integer("played"),
    win_ratio: varchar("win_ratio", { length: 10 }),
    won: integer("won"),
    lost: integer("lost"),
    tier_id: integer("tier_id"),
    tier_href: varchar("tier_href", { length: 512 }),
    created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
    history: jsonb("history").default(sql`'[]'::jsonb`),
    present: boolean("present").default(false)

  },
  (leaderboard) => ({
    classicEuRbgPrimaryIndex: index("classic_eu_rbg_primary_idx").on(
      leaderboard.character_name,
      leaderboard.realm_slug,
    ),
    classicEuRBGCharacterNameIndex: index("classic_eu_RBG_character_name_idx").on(leaderboard.character_name),
    classicEuRBGCharacterIdIndex: index("classic_eu_RBG_character_id_idx").on(leaderboard.character_id),
    classicEuRBGCharacterClassIndex: index("classic_eu_RBG_character_class_idx").on(leaderboard.character_class),
    classicEuRBGCharacterSpecIndex: index("classic_eu_RBG_character_spec_idx").on(leaderboard.character_spec),
    classicEuRBGFactionNameIndex: index("classic_eu_RBG_faction_name_idx").on(leaderboard.faction_name),
    classicEuRBGRankIndex: index("classic_eu_RBG_rank_idx").on(leaderboard.rank),
    classicEuRBGRatingIndex: index("classic_eu_RBG_rating_idx").on(leaderboard.rating),
    classicEuRBGPlayedIndex: index("classic_eu_RBG_played_idx").on(leaderboard.played),
    classicEuRBGWinRatioIndex: index("classic_eu_RBG_win_ratio_idx").on(leaderboard.win_ratio)
  })
);


export const authToken = createTable(
  "auth_token",
  {
    id: serial("id").primaryKey(),
    access_token: varchar("access_token", { length: 255 }).unique().notNull(),
    token_type: varchar("token_type", { length: 50 }).notNull(),
    expires_in: integer("expires_in").notNull(),
    sub: varchar("sub", { length: 255 }),
    created_at: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
  },
  (authToken) => ({
    accessTokenIndex: index("access_token_idx").on(authToken.access_token),
    subIndex: index("sub_idx").on(authToken.sub),
    expiresInIndex: index("expires_in_idx").on(authToken.expires_in)
  })
);

export const usRealms = createTable(
  "us_realms",
  {
    id: serial("id").primaryKey(),
    realm_name: varchar("realm_name", { length: 256 }),
    records_count: integer("records_count").default(0),
  },
  (usRealms) => ({
    usRealmsIndex: index("us_realm_name_idx").on(usRealms.realm_name),
    usRecordsCountIndex: index("us_records_count_idx").on(usRealms.records_count),
  })
);

export const euRealms = createTable(
  "eu_realms",
  {
    id: serial("id").primaryKey(),
    realm_name: varchar("realm_name", { length: 256 }),
    records_count: integer("records_count").default(0),
  },
  (usRealms) => ({
    usRealmsIndex: index("eu_realm_name_idx").on(usRealms.realm_name),
    euRecordsCountIndex: index("eu_records_count_idx").on(usRealms.records_count),
  })
);

export const classicUsRealms = createTable(
  "classic_us_realms",
  {
    id: serial("id").primaryKey(),
    realm_name: varchar("realm_name", { length: 256 }),
    records_count: integer("records_count").default(0),
  },
  (usRealms) => ({
    usRealmsIndex: index("classic_us_realm_name_idx").on(usRealms.realm_name),
    classicUsRecordsCountIndex: index("classic_us_records_count_idx").on(usRealms.records_count),
  })
);

export const classicEusRealms = createTable(
  "classic_eu_realms",
  {
    id: serial("id").primaryKey(),
    realm_name: varchar("realm_name", { length: 256 }),
    records_count: integer("records_count").default(0),
  },
  (usRealms) => ({
    usRealmsIndex: index("classic_eu_realm_name_idx").on(usRealms.realm_name),
    classicEuRecordsCountIndex: index("classic_eu_records_count_idx").on(usRealms.records_count),
  })
);