import {
  activePartnersKey,
  consoleStateKey,
  fetchedAdsStorageKeyPrefix,
  interestGroupsStorageKey,
  logsCountKey,
  logsKey,
  winnersRegisterKey
} from './storage-keys.js'

/* eslint-env browser */

/* eslint no-unused-vars: 0 */

/**
 * Lists all partners that have/hod some ad stored in this browser.
 */
function listActivePartners () {
  return JSON.parse(window.localStorage.getItem(activePartnersKey)) || []
}

/**
 * Lists all ads that won an on-device auction.
 */
export function listWinners () {
  return JSON.parse(window.localStorage.getItem(winnersRegisterKey))?.reverse() || []
}

/**
 * Lists all retrieved ads saved in localStorage.
 */
export function listAds () {
  const ads = []
  for (const adPartner of listActivePartners()) {
    const partnerAdsKey = fetchedAdsStorageKeyPrefix + adPartner
    const partnerAdsMap = JSON.parse(window.localStorage.getItem(partnerAdsKey)) || {}
    for (const [groupName, adList] of Object.entries(partnerAdsMap)) {
      for (const [adId, ad] of Object.entries(adList)) {
        ads.push(ad)
      }
    }
  }
  return ads
}

/**
 * Restarts turtledove console
 */
export function restartConsole () {
  window.localStorage.setItem(consoleStateKey, '{}')
}

/**
 * Removes turtledove log
 */
export function removeLogs () {
  window.localStorage.setItem(logsKey, null)
  window.localStorage.setItem(logsCountKey, 0)
}

/**
 * Removes registry of all previously shown ads.
 */
export function removeWinnersHistory () {
  window.localStorage.setItem(winnersRegisterKey, '[]')
}

/**
 * Removes all previously fetched ads from local storage
 */
export function removeFetchedAds () {
  for (const adPartner of listActivePartners()) {
    window.localStorage.setItem(fetchedAdsStorageKeyPrefix + adPartner, '{}')
  }
  window.localStorage.setItem(interestGroupsStorageKey, '{}')
  window.localStorage.setItem(activePartnersKey, '[]')
}

/**
 * Removes one previously fetched ad from local storage
 */
export function removeAd (adPartner, groupName, adId) {
  const adPartnerKey = fetchedAdsStorageKeyPrefix + adPartner
  const ads = JSON.parse(window.localStorage.getItem(adPartnerKey)) || {}
  if (groupName in ads && adId in ads[groupName]) {
    delete ads[groupName][adId]
    window.localStorage.setItem(adPartnerKey, JSON.stringify(ads))
  }
}

export function removeEverything () {
  removeFetchedAds()
  removeWinnersHistory()
  removeLogs()
  restartConsole()
}
