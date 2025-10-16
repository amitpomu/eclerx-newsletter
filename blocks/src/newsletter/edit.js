import { __ } from "@wordpress/i18n";
import {
	useInnerBlocksProps,
	useBlockProps,
	RichText,
} from "@wordpress/block-editor";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const ALLOWED_BLOCKS = [];
	const TEMPLATE = [
		[
			"core/heading",
			{
				content: __("Sign up to the Penguin Newsletter", "eclerx"),
				level: 3,
				style: {
					spacing: {
						margin: {
							top: "0",
							bottom: "0",
						},
					},
				},
			},
		],
		[
			"core/paragraph",
			{
				content: __(
					"For the latest books, recommendations, author interviews and more",
					"eclerx",
				),
			},
		],
	];

	const blocksProps = useBlockProps({ className: `eclerx-newsletter-block` });
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blocksProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		orientation: "horizontal",
	});

	return (
		<div {...innerBlocksProps}>
			<div className="eclerx-newsletter-wrapper">
				<div className="eclerx-newsletter-label">{children}</div>
				<form id="eclerx-newsletter">
					<div className="eclerx-row">
						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<input
								type="text"
								id="firstname"
								name="firstname"
								value={__("Your Firstname", "eclerx")}
								disabled
							/>
						</div>

						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<input
								type="text"
								id="surname"
								name="surname"
								value={__("Your Surname", "eclerx")}
								disabled
							/>
						</div>
					</div>

					<div className="eclerx-row">
						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<input
								type="email"
								id="email"
								name="email"
								value="Your Email"
								disabled
							/>
						</div>

						<div className="eclerx-newsletter-input-wrapper eclerx-column-half">
							<button type="submit" disabled>
								{__("Sign up", "eclerx")}
							</button>
						</div>
					</div>
				</form>
				<div className="eclerx-newsletter-info">
					<RichText
						tagName="span"
						className="eclerx-caption"
						value={attributes.caption}
						allowedFormats={["core/bold", "core/italic"]}
						onChange={(caption) => setAttributes({ caption })}
					/>
				</div>
			</div>
		</div>
	);
}
