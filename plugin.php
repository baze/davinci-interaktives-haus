<?php
/**
 * Plugin Name: DAVINCI HAUS Interaktives Haus
 * Plugin URI: https://www.euw.de
 * Description: TODO: ADD DESCRIPTION
 * Version: 0.1.0
 * Author: Björn Martensen
 * Author URI: https://www.euw.de
 * License: GPL2
 */

namespace EUW\InteractiveHouse;

use Twig_Environment;
use Twig_Loader_Filesystem;

require_once 'vendor/autoload.php';

class Plugin {

	private $twig;

	public function __construct() {

		$loader = new Twig_Loader_Filesystem( __DIR__ . '/views' );
		$this->twig   = new Twig_Environment( $loader );

		add_action( 'wp_enqueue_scripts', [$this, 'enqueue_scripts'] );
//		add_filter( 'the_content', [$this, 'render'], 99 );
		add_shortcode( 'interactive_house', [$this, 'shortcode_interactive_house'] );
	}

	function enqueue_scripts() {

		wp_enqueue_style( 'euw-interactive-house', plugins_url( '/dest/css/main.css', __FILE__ ) );
		wp_enqueue_script( 'euw-interactive-house', plugins_url( '/dest/js/bundle.js', __FILE__ ), array(), '1.0', true );

		if ( function_exists( 'get_field' ) ) {

			wp_localize_script( 'euw-interactive-house', 'config', array(
				'backgroundImage'  => get_field( 'euw_interactive_house__backgroundImage' ),
				'maps'             => get_field( 'euw_interactive_house__maps' ),
				'slideshow'        => get_field( 'euw_interactive_house__slideshow' ),
				'slideshowEnabled' => get_field( 'euw_interactive_house__slideshowEnabled' ),
				'slideshowDelay'   => get_field( 'euw_interactive_house__slideshowDelay' ),
				'slideshowSpeed'   => get_field( 'euw_interactive_house__slideshowSpeed' ),
			) );

		} else {
			echo "This Plugin requires ACF Pro";
		}
	}

	function render( $content) {

		return $content;
	}

	function add_custom_fields() {
		if ( function_exists( 'acf_add_local_field_group' ) ):

			/*acf_add_local_field_group( array(
				'key'                   => 'group_591d692dd7df7',
				'title'                 => 'Inhaltsverzeichnis',
				'fields'                => array(
					array(
						'default_value'     => 0,
						'message'           => '',
						'ui'                => 1,
						'ui_on_text'        => '',
						'ui_off_text'       => '',
						'key'               => 'field_591d693c406aa',
						'label'             => 'Inhaltsverzeichnis anzeigen',
						'name'              => 'post_toc_show',
						'type'              => 'true_false',
						'instructions'      => '',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
							'width' => '',
							'class' => '',
							'id'    => '',
						),
					),
					array(
						'multiple'          => 0,
						'allow_null'        => 0,
						'choices'           => array(
							'h1' => 'h1',
							'h2' => 'h2',
							'h3' => 'h3',
							'h4' => 'h4',
							'h5' => 'h5',
							'h6' => 'h6',
						),
						'default_value'     => array(
							0 => 'h2',
						),
						'ui'                => 0,
						'ajax'              => 0,
						'placeholder'       => '',
						'return_format'     => 'value',
						'key'               => 'field_591d695b406ab',
						'label'             => 'Überschrift-Selektor',
						'name'              => 'post_toc_headline_type',
						'type'              => 'select',
						'instructions'      => '',
						'required'          => 0,
						'conditional_logic' => array(
							array(
								array(
									'field'    => 'field_591d693c406aa',
									'operator' => '==',
									'value'    => '1',
								),
							),
						),
						'wrapper'           => array(
							'width' => '',
							'class' => '',
							'id'    => '',
						),
					),
				),
				'location'              => array(
					array(
						array(
							'param'    => 'post_type',
							'operator' => '==',
							'value'    => 'leistung',
						),
					),
				),
				'menu_order'            => 0,
				'position'              => 'normal',
				'style'                 => 'default',
				'label_placement'       => 'top',
				'instruction_placement' => 'label',
				'hide_on_screen'        => '',
				'active'                => 1,
				'description'           => '',
			) );*/

		endif;
	}

	function shortcode_interactive_house( $atts ) {

		$context = [];

		$html = $this->twig->render( 'maps.twig', $context );

		return $html;
	}

}

new Plugin;