const request        = require( 'request' );

const Slideshare = {
  /**
   * Get meta for given slides
   *
   * @param  {String}   url      url
   * @param  {Function} callback callback
   */
  getMeta : ( url, callback ) => {
    url = 'http://www.slideshare.net/api/oembed/2?url=' + url +
                '&format=json';

    request(
      {
        url     : url,
        headers : {
          'User-Agent' : 'perf-tooling.today'
        }
      },
      function( error, response, body ) {
        let meta;

        if ( error ) {
          return callback( error );
        } else {
          try {
            meta = JSON.parse( body );
          } catch( e ) {
            return callback( e );
          }

          return callback(
            null,
            {
              thumbnail : {
                url    : meta.thumbnail,
              },
              html      : meta.html,
              stats     : {
                length : meta.total_slides
              },
              title     : meta.title
            }
          );
        }
      }
    );
  }
};

module.exports = {
  init : () => Object.create( Slideshare )
};
