const request        = require( 'request' );

const Slideshare = {
  /**
   * Get meta for given slides
   *
   * @param  {String}   url      url
   * @param  {Function} callback callback
   */
  getMeta : ( url, callback ) => {
    url = 'https://speakerdeck.com/oembed.json?url=' + url;

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

          // let's see how long this
          // will work :P
          const id = /speakerdeck.com\/player\/(.*?)"/g.exec( meta.html )[ 1 ];

          return callback(
            null,
            {
              thumbnail : {
                url    : 'https://speakerd.s3.amazonaws.com/presentations/' + id + '/thumb_slide_0.jpg'
              },
              html      : meta.html,
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
