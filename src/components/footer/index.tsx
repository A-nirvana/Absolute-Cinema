
const Footer = () => {
    return (
        <main>
            <hr className=' bg-muted-foreground h-3 '/>
            <div className=' bg-muted text-center'>
                <div className='flex flex-wrap justify-between py-8 px-8 md:px-16'>
                    <div>
                        <div className="flex top-soc space-x-3">
                            <a data-track="twitter" href="https://twitter.com/GawdGambit" target="_blank" className="link-s w-inline-block">
                            <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/65a4fe4237b6a1c4fa714f76_x.svg" loading="lazy" alt="Twitter" className="invert dark:invert-0" /></a>
                            <a data-track="instagram" href="https://www.instagram.com/ani_r_baan/" target="_blank" className="link-s w-inline-block">
                            <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/65a4fe42d907d27f3dead7a0_instagram.svg" loading="lazy" alt="Instagram" className="invert dark:invert-0" /></a>
                            <a data-track="facebook" href="https://www.facebook.com/profile.php?id=61553104123672" target="_blank" className="link-s w-inline-block">
                            <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/65a4fe4173c1df8be608c8a2_facebook.svg" loading="lazy" alt="Facebook" className="invert dark:invert-0" /></a>
                            <a data-track="youtube" href="https://www.youtube.com/@Amaster-tw5mo" target="_blank" className="link-s w-inline-block">
                            <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/65a4fe42d907d27f3dead7ad_youtube.svg" loading="lazy" alt="Youtube" className="invert dark:invert-0" /></a>
                        </div>
                        <p className="copyright mt-16">
                        &copy; Harvest {new Date().getFullYear()}
                    </p>
                    </div>
                    
                <div id="node" className="w-[40%] md:max-w-[10vw]">
                    <div className=' text-xl font-semibold'>Product</div>
                    <ul>
                        <li><a>Download</a></li>
                        <li><a>Premium</a></li>
                        <li><a>Status</a></li>
                        <li><a>App Directory</a></li>
                    </ul>
                </div>
                <div className="w-[40%] md:max-w-[10vw] mt-12 md:mt-0">
                    <div className=' text-xl font-semibold'>Resources</div>
                    <ul>
                        <li><a>Support</a></li>
                        <li><a>Safety</a></li>
                        <li><a>Blog</a></li>
                        <li><a>Feedback</a></li>
                    </ul>
                </div>
                <div className="w-[40%] md:max-w-[10vw] mt-12 md:mt-0">
                    <div className=' text-xl font-semibold'>Policies</div>
                    <ul>
                        <li><a>Terms</a></li>
                        <li><a>Privacy</a></li>
                        <li><a>Cookie Settings</a></li>
                        <li><a>Guidelines</a></li>
                        <li><a>Acknowledgements</a></li>
                        <li><a>Licenses</a></li>
                    </ul>
                </div>
                </div>
            </div>
        </main>
    );
};

export default Footer;