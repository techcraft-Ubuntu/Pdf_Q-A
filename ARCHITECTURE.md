// chunker.service.js

/*
 * Splits a large text into smaller overlapping chunks.
 *
 * Why overlap? If a sentence/idea spans a chunk boundary, overlap ensures
 * it isn't cut in half and lost from retrieval — both neighboring chunks
 * will contain enough of it to be found.

 */